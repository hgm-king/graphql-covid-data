/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::ByAge;
use diesel::prelude::*;
use diesel::dsl::Eq;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="ByAge"]
pub struct ByAgeT {
    pub index: String,
    pub AGE_GROUP: Option<String>,
    pub CASE_RATE: Option<f64>,
    pub HOSPITALIZED_RATE: Option<f64>,
    pub DEATH_RATE: Option<f64>,
    pub CASE_COUNT: Option<f64>,
    pub HOSPITALIZED_COUNT: Option<f64>,
    pub DEATH_COUNT: Option<f64>,
    pub date: Option<String>,
}

pub fn read(conn: &PgConnection) -> Vec<ByAgeT> {
    ByAge::table
        .load::<ByAgeT>(conn)
        .expect("Error loading object")
}