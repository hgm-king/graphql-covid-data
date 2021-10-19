// main file runs the server

use std::sync::Arc;

use dotenv::dotenv;
use hyper::{
    service::{make_service_fn, service_fn},
    Body, Method, Response, Server, StatusCode,
};
use juniper::{EmptyMutation, EmptySubscription, RootNode};
use std::env;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let addr = ([0, 0, 0, 0], 4000).into();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db = Arc::new(server::context::Context::new(&database_url));

    let root_node = Arc::new(RootNode::new(
        server::QueryRoot,
        EmptyMutation::<server::context::Context>::new(),
        EmptySubscription::<server::context::Context>::new(),
    ));

    let new_service = make_service_fn(move |_| {
        let root_node = root_node.clone();
        let ctx = db.clone();

        async {
            Ok::<_, hyper::Error>(service_fn(move |req| {
                let root_node = root_node.clone();
                let ctx = ctx.clone();
                println!("{:?}", req);
                async {
                    match (req.method(), req.uri().path()) {
                        (&Method::GET, "/") => {
                            let (_parts, body) = juniper_hyper::graphiql("/graphql", None)
                                .await?
                                .into_parts();

                            let response = Response::builder()
                                .header("Access-Control-Allow-Origin", "*")
                                .status(StatusCode::OK)
                                .body(body)
                                .unwrap();

                            Ok(response)
                        }
                        (&Method::GET, "/graphql") | (&Method::POST, "/graphql") => {
                            let res = juniper_hyper::graphql(root_node, ctx, req).await;
                            res.map(|r| {
                                let (_parts, body) = r.into_parts();
                                Response::builder()
                                    .header("Access-Control-Allow-Origin", "*")
                                    .status(StatusCode::OK)
                                    .body(body)
                                    .unwrap()
                            })
                        }
                        (&Method::OPTIONS, "/graphql") => {
                            let response = Response::builder()
                                .header("Access-Control-Allow-Origin", "*")
                                .header("Access-Control-Allow-Headers", "Content-Type")
                                .status(StatusCode::OK)
                                .body(Body::empty())
                                .unwrap();

                            Ok(response)
                        }
                        (&Method::GET, "/health") => {
                            let response = Response::builder()
                                .header("Access-Control-Allow-Origin", "*")
                                .status(StatusCode::OK)
                                .body(Body::empty())
                                .unwrap();

                            Ok(response)
                        }
                        _ => {
                            let response = Response::builder()
                                .status(StatusCode::NOT_FOUND)
                                .body(Body::empty())
                                .unwrap();
                            Ok(response)
                        }
                    }
                }
            }))
        }
    });

    let server_instance = Server::bind(&addr).serve(new_service);
    println!("Listening on http://{}", addr);

    if let Err(e) = server_instance.await {
        eprintln!("server error: {}", e)
    }
}
