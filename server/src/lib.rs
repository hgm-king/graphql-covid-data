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

use models::{coviddatafrontendModel, DataByDayModel};

pub struct QueryRoot;

#[graphql_object(context = "DbConn")]
impl QueryRoot {
    fn coviddatafrontend(
        context: &DbConn,
    ) -> FieldResult<Vec<coviddatafrontendModel::coviddatafrontendT>> {
        let connection = context.get_conn();
        let coviddatafrontend = coviddatafrontendModel::read(&connection);
        Ok(coviddatafrontend)
    }

    fn DataByDay(context: &DbConn) -> FieldResult<Vec<DataByDayModel::DataByDayT>> {
        let connection = context.get_conn();
        let data_by_day = DataByDayModel::read(&connection);
        Ok(data_by_day)
    }
}
