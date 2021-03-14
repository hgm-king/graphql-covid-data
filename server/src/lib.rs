// lib exports the main graphql query made with juniper
#![recursion_limit = "512"]

#[macro_use]
extern crate diesel;
extern crate dotenv;
#[macro_use]
extern crate juniper;

pub mod context;
pub mod models;
pub mod schema;

use context::Context;
use juniper::FieldResult;

use models::{
    AntibodyByAgeModel, ByAgeModel, ByRaceModel, DataByDayModel, DataByModzctaModel,
    DeathsByBoroAgeModel, DeathsByRaceAgeModel, SummaryPrimeModel, ZctaToModzctaModel,
};

pub struct QueryRoot;

#[graphql_object(context = "Context")]
impl QueryRoot {
    fn AntibodyByAge(context: &Context) -> FieldResult<Vec<AntibodyByAgeModel::AntibodyByAgeT>> {
        let connection = context.get_conn();
        let antibody = AntibodyByAgeModel::read(&connection);
        Ok(antibody)
    }

    fn ByAge(context: &Context) -> FieldResult<Vec<ByAgeModel::ByAgeT>> {
        let connection = context.get_conn();
        let by_age = ByAgeModel::read(&connection);
        Ok(by_age)
    }

    fn ByRace(context: &Context) -> FieldResult<Vec<ByRaceModel::ByRaceT>> {
        let connection = context.get_conn();
        let by_race = ByRaceModel::read(&connection);
        Ok(by_race)
    }

    fn DataByModzcta(
        context: &Context,
    ) -> FieldResult<Vec<DataByModzctaModel::DataByModzctaWithZctaT>> {
        let connection = context.get_conn();
        let by_modzcta = DataByModzctaModel::read(&connection)
            .into_iter()
            .map(DataByModzctaModel::to_DataByModzctaWithZctaT)
            .collect();
        Ok(by_modzcta)
    }

    fn DeathsByBoroAge(
        context: &Context,
    ) -> FieldResult<Vec<DeathsByBoroAgeModel::DeathsByBoroAgeT>> {
        let connection = context.get_conn();
        let deaths_by_boro_age = DeathsByBoroAgeModel::read(&connection);
        Ok(deaths_by_boro_age)
    }

    fn DeathsByRaceAge(
        context: &Context,
    ) -> FieldResult<Vec<DeathsByRaceAgeModel::DeathsByRaceAgeT>> {
        let connection = context.get_conn();
        let deaths_by_race_age = DeathsByRaceAgeModel::read(&connection);
        Ok(deaths_by_race_age)
    }

    fn SummaryPrime(context: &Context) -> FieldResult<Vec<SummaryPrimeModel::SummaryPrimeT>> {
        let connection = context.get_conn();
        let summary = SummaryPrimeModel::read(&connection);
        Ok(summary)
    }

    fn DataByDay(context: &Context) -> FieldResult<Vec<DataByDayModel::DataByDayT>> {
        let connection = context.get_conn();
        let data_by_day = DataByDayModel::read(&connection);
        Ok(data_by_day)
    }
}
