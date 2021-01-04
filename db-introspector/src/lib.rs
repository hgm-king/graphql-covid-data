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

use models::antibody_by_age;

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

pub struct Query;
#[graphql_object(context="Context")]
impl Query {
    fn api_version() -> &'static str {
        "0.1"
    }

    // Arguments to resolvers can either be simple types or input objects.
    // The executor is a special (optional) argument that allows accessing the context.
    fn antibody_by_age(context: &Context) -> FieldResult<Vec<antibody_by_age::AntibodyByAgeT>> {
        // Get the context from the executor.
        let connection = establish_connection();
        let antibody = antibody_by_age::read(&connection);
        // Return the result.
        Ok(antibody)
    }
}

pub struct Mutation;

impl Mutation {
    // fn createAntibody(&executor, new_antibody: antibody_by_age::AntibodyByAgeT) -> FieldResult<antibody_by_age::AntibodyByAgeT> {
    //     let connection = &executor.context.connection;
    //     let antibody: antibody_by_age::AntibodyByAgeT = antibody_by_age::create(connection, &new_antibody);
    //
    //     Ok(antibody)
    // }
}

// pub fn print_query<T>(query: &T) -> () {
//     println!("{}", diesel::debug_query::<diesel::pg::Pg, T>(query));
// }
