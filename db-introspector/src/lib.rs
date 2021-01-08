// lib exports the main graphql query made with juniper

#[macro_use] extern crate diesel;
extern crate dotenv;
#[macro_use] extern crate juniper;

pub mod schema;
pub mod models;
pub mod parser;
pub mod generator;

use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use juniper::{FieldResult,Variables,EmptySubscription};
use std::env;

use models::AntibodyByAgeModel;

pub struct Context {
    // Use your real database pool here.
}

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

impl juniper::Context for Context {}

pub struct QueryRoot;

#[graphql_object(context="Context")]
impl QueryRoot {
    fn AntibodyByAge(context: &Context) -> FieldResult<Vec<AntibodyByAgeModel::AntibodyByAgeT>> {
        let connection = establish_connection();
        let antibody = AntibodyByAgeModel::read(&connection);
        Ok(antibody)
    }
}
