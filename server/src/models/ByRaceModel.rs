/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::ByRace;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="ByRace"]
pub struct ByRaceT {
    pub id: i32,
    pub RACE_GROUP: Option<String>,
    pub CASE_RATE_ADJ: Option<f64>,
    pub HOSPITALIZED_RATE_ADJ: Option<f64>,
    pub DEATH_RATE_ADJ: Option<f64>,
    pub CASE_COUNT: Option<f64>,
    pub HOSPITALIZED_COUNT: Option<f64>,
    pub DEATH_COUNT: Option<f64>,
    pub date: Option<String>,
}

pub fn read(conn: &PgConnection) -> Vec<ByRaceT> {
    ByRace::table
        .order((ByRace::RACE_GROUP.asc(), ByRace::date.asc()))
        .load::<ByRaceT>(conn)
        .expect("Error loading object")
}
