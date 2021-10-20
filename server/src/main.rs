use env_logger::Env;
use juniper::{EmptyMutation, EmptySubscription, RootNode};
use log::info;
use server::{config::generate_config, db_conn::DbConn, QueryRoot};
use std::net::SocketAddr;
use warp::{http::Response, Filter};

type Schema = RootNode<'static, QueryRoot, EmptyMutation<DbConn>, EmptySubscription<DbConn>>;

#[tokio::main]
async fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    info!("Booting Covid Data Server 🦠");

    // set up global dependencies, using arc to have shared references across requests
    let config = generate_config();
    let db_conn = DbConn::new(&config.db_path);

    let log = warp::log("warp_server");

    let homepage = warp::path::end().map(|| {
        Response::builder()
            .header("content-type", "text/html")
            .body(format!(
                "<html><h1>juniper_warp</h1><div>visit <a href=\"/graphiql\">/graphiql</a></html>"
            ))
    });

    let schema = Schema::new(
        QueryRoot,
        EmptyMutation::<DbConn>::new(),
        EmptySubscription::<DbConn>::new(),
    );
    let state = warp::any().map(move || db_conn.clone());
    let graphql_filter = juniper_warp::make_graphql_filter(schema, state.boxed());

    let graphql_options = warp::options()
        .and(warp::path("graphql"))
        .map(|| warp::reply())
        .map(|reply| {
            warp::reply::with_header(reply, "Access-Control-Allow-Headers", "Content-Type")
        });

    let graphql_post = warp::post().and(warp::path("graphql").and(graphql_filter));

    let graphql = graphql_options.or(graphql_post);

    let end = warp::get()
        .and(warp::path("graphiql"))
        .and(juniper_warp::graphiql_filter("/graphql", None))
        .or(homepage)
        .or(graphql)
        .map(|reply| {
            warp::reply::with_header(reply, "Access-Control-Allow-Origin", "http://0.0.0.0:8080")
        })
        .with(log);

    // setup our address from the config
    let socket_address = config
        .clone()
        .app_addr
        .parse::<SocketAddr>()
        .expect("Could not parse Addr");

    info!("Listening at {}", &config.app_addr);

    if config.clone().tls {
        info!("🔐 TLS Enabled!");

        // serve over tls if config says so
        warp::serve(end)
            .tls()
            .cert_path(config.clone().cert_path.as_ref().unwrap())
            .key_path(config.clone().key_path.as_ref().unwrap())
            .run(socket_address)
            .await;
    } else {
        // otherwise serve normally
        warp::serve(end).run(socket_address).await;
    }
}
