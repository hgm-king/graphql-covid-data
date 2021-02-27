/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::DataByDay;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="DataByDay"]
pub struct DataByDayT {
    pub id: i32,
    pub date_of_interest: Option<String>,
    pub CASE_COUNT: Option<i64>,
    pub PROBABLE_CASE_COUNT: Option<i64>,
    pub HOSPITALIZED_COUNT: Option<i64>,
    pub DEATH_COUNT: Option<i64>,
    pub PROBABLE_DEATH_COUNT: Option<i64>,
    pub CASE_COUNT_7DAY_AVG: Option<i64>,
    pub ALL_CASE_COUNT_7DAY_AVG: Option<i64>,
    pub HOSP_COUNT_7DAY_AVG: Option<i64>,
    pub DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub INCOMPLETE: Option<i64>,
}

pub fn read(conn: &PgConnection) -> Vec<DataByDayT> {
    DataByDay::table
        .order(DataByDay::date.asc())
        .load::<DataByDayT>(conn)
        .expect("Error loading object")
}
