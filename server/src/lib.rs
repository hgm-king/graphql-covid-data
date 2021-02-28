// lib exports the main graphql query made with juniper
#![recursion_limit = "512"]

#[macro_use]
extern crate diesel;
extern crate dotenv;
#[macro_use]
extern crate juniper;

pub mod models;
pub mod schema;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use juniper::FieldResult;
use std::env;

use models::{
    AntibodyByAgeModel, ByRaceModel, DataByDayModel, DataByModzctaModel, SummaryPrimeModel,
    ZctaToModzctaModel,
};

pub struct Context {
    // Use your real database pool here.
}

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

impl juniper::Context for Context {}

pub struct QueryRoot;

#[graphql_object(context = "Context")]
impl QueryRoot {
    fn AntibodyByAge(_context: &Context) -> FieldResult<Vec<AntibodyByAgeModel::AntibodyByAgeT>> {
        let connection = establish_connection();
        let antibody = AntibodyByAgeModel::read(&connection);
        Ok(antibody)
    }

    fn ByRace(_context: &Context) -> FieldResult<Vec<ByRaceModel::ByRaceT>> {
        let connection = establish_connection();
        let by_race = ByRaceModel::read(&connection);
        Ok(by_race)
    }

    fn DataByModzcta(
        _context: &Context,
    ) -> FieldResult<Vec<DataByModzctaModel::DataByModzctaWithZctaT>> {
        let connection = establish_connection();
        let by_modzcta = DataByModzctaModel::read(&connection)
            .into_iter()
            .map(DataByModzctaModel::to_DataByModzctaWithZctaT)
            .collect();
        Ok(by_modzcta)
    }

    fn SummaryPrime(_context: &Context) -> FieldResult<Vec<SummaryPrimeModel::SummaryPrimeT>> {
        let connection = establish_connection();
        let summary = SummaryPrimeModel::read(&connection);
        Ok(summary)
    }

    fn DataByDay(_context: &Context) -> FieldResult<Vec<DataByDayModel::DataByDayT>> {
        let connection = establish_connection();
        let data_by_day = DataByDayModel::read(&connection);
        Ok(data_by_day)
    }
}
