/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::HospByDay;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="HospByDay"]
pub struct HospByDayT {
    pub id: i32,
    pub date_of_interest: Option<String>,
    pub HOSPITALIZED_COUNT: Option<i64>,
    pub HOSP_COUNT_7DAY_AVG: Option<i64>,
    pub BX_HOSPITALIZED_COUNT: Option<i64>,
    pub BX_HOSPITALIZED_COUNT_7DAY_AVG: Option<i64>,
    pub BK_HOSPITALIZED_COUNT: Option<i64>,
    pub BK_HOSPITALIZED_COUNT_7DAY_AVG: Option<i64>,
    pub MN_HOSPITALIZED_COUNT: Option<i64>,
    pub MN_HOSPITALIZED_COUNT_7DAY_AVG: Option<i64>,
    pub QN_HOSPITALIZED_COUNT: Option<i64>,
    pub QN_HOSPITALIZED_COUNT_7DAY_AVG: Option<i64>,
    pub SI_HOSPITALIZED_COUNT: Option<i64>,
    pub SI_HOSPITALIZED_COUNT_7DAY_AVG: Option<i64>,
    pub INCOMPLETE: Option<i64>,
}

pub fn read(conn: &PgConnection) -> Vec<HospByDayT> {
    HospByDay::table
        .order(HospByDay::date.asc())
        .load::<HospByDayT>(conn)
        .expect("Error loading object")
}