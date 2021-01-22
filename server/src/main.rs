// main file runs the server

use std::sync::Arc;

use hyper::{
    service::{make_service_fn, service_fn},
    Body, Method, Response, Server, StatusCode,
};
use juniper::{EmptyMutation, EmptySubscription, RootNode};

#[tokio::main]
async fn main() {
    pretty_env_logger::init();

    let addr = ([127, 0, 0, 1], 3000).into();

    let db = Arc::new(db_introspector::Context {});
    let root_node = Arc::new(RootNode::new(
        db_introspector::QueryRoot,
        EmptyMutation::<db_introspector::Context>::new(),
        EmptySubscription::<db_introspector::Context>::new(),
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
                            let (parts, body) = juniper_hyper::graphiql("/graphql", None)
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
                            let mut res = juniper_hyper::graphql(root_node, ctx, req).await;
                            res.map(|r| {
                                let (_parts, body) = r.into_parts();
                                let response = Response::builder()
                                    .header("Access-Control-Allow-Origin", "*")
                                    .status(StatusCode::OK)
                                    .body(body)
                                    .unwrap();
                                response
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

    let server = Server::bind(&addr).serve(new_service);
    println!("Listening on http://{}", addr);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e)
    }
}