// lib exports the main graphql query made with juniper
#![recursion_limit = "512"]

#[macro_use]
extern crate diesel;
extern crate dotenv;
#[macro_use]
extern crate juniper;

pub mod config;
pub mod db_conn;
pub mod models;
pub mod schema;

use db_conn::DbConn;
use juniper::FieldResult;

use models::{
    coviddatafrontendModel, ByAgeModel, ByRaceModel, DataByDayModel, DataByModzctaModel,
    DeathsByBoroAgeModel, DeathsByRaceAgeModel, SummaryPrimeModel, ZctaToModzctaModel,
};

pub struct QueryRoot;

#[graphql_object(context = "DbConn")]
impl QueryRoot {
    // fn AntibodyByAge(context: &DbConn) -> FieldResult<Vec<AntibodyByAgeModel::AntibodyByAgeT>> {
    //     let connection = context.get_conn();
    //     let antibody = AntibodyByAgeModel::read(&connection);
    //     Ok(antibody)
    // }

    fn ByAge(context: &DbConn) -> FieldResult<Vec<ByAgeModel::ByAgeT>> {
        let connection = context.get_conn();
        let by_age = ByAgeModel::read(&connection);
        Ok(by_age)
    }

    fn ByRace(context: &DbConn) -> FieldResult<Vec<ByRaceModel::ByRaceT>> {
        let connection = context.get_conn();
        let by_race = ByRaceModel::read(&connection);
        Ok(by_race)
    }

    fn coviddatafrontend(
        context: &DbConn,
    ) -> FieldResult<Vec<coviddatafrontendModel::coviddatafrontendT>> {
        let connection = context.get_conn();
        let coviddatafrontend = coviddatafrontendModel::read(&connection);
        Ok(coviddatafrontend)
    }

    fn DataByModzcta(
        context: &DbConn,
    ) -> FieldResult<Vec<DataByModzctaModel::DataByModzctaWithZctaT>> {
        let connection = context.get_conn();
        let by_modzcta = DataByModzctaModel::read(&connection)
            .into_iter()
            .map(DataByModzctaModel::to_DataByModzctaWithZctaT)
            .collect();
        Ok(by_modzcta)
    }

    fn DeathsByBoroAge(
        context: &DbConn,
    ) -> FieldResult<Vec<DeathsByBoroAgeModel::DeathsByBoroAgeT>> {
        let connection = context.get_conn();
        let deaths_by_boro_age = DeathsByBoroAgeModel::read(&connection);
        Ok(deaths_by_boro_age)
    }

    fn DeathsByRaceAge(
        context: &DbConn,
    ) -> FieldResult<Vec<DeathsByRaceAgeModel::DeathsByRaceAgeT>> {
        let connection = context.get_conn();
        let deaths_by_race_age = DeathsByRaceAgeModel::read(&connection);
        Ok(deaths_by_race_age)
    }

    fn SummaryPrime(context: &DbConn) -> FieldResult<Vec<SummaryPrimeModel::SummaryPrimeT>> {
        let connection = context.get_conn();
        let summary = SummaryPrimeModel::read(&connection);
        Ok(summary)
    }

    fn DataByDay(context: &DbConn) -> FieldResult<Vec<DataByDayModel::DataByDayT>> {
        let connection = context.get_conn();
        let data_by_day = DataByDayModel::read(&connection);
        Ok(data_by_day)
    }
}
