/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::DeathsByDay;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="DeathsByDay"]
pub struct DeathsByDayT {
    pub id: i32,
    pub date_of_interest: Option<String>,
    pub DEATH_COUNT: Option<i64>,
    pub PROBABLE_DEATH_COUNT: Option<i64>,
    pub DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub BX_DEATH_COUNT: Option<i64>,
    pub BX_PROBABLE_DEATH_COUNT: Option<i64>,
    pub BX_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub BX_ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub BK_DEATH_COUNT: Option<i64>,
    pub BK_PROBABLE_DEATH_COUNT: Option<i64>,
    pub BK_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub BK_ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub MN_DEATH_COUNT: Option<i64>,
    pub MN_PROBABLE_DEATH_COUNT: Option<i64>,
    pub MN_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub MN_ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub QN_DEATH_COUNT: Option<i64>,
    pub QN_PROBABLE_DEATH_COUNT: Option<i64>,
    pub QN_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub QN_ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub SI_DEATH_COUNT: Option<i64>,
    pub SI_PROBABLE_DEATH_COUNT: Option<i64>,
    pub SI_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub SI_ALL_DEATH_COUNT_7DAY_AVG: Option<i64>,
    pub INCOMPLETE: Option<i64>,
}

pub fn read(conn: &PgConnection) -> Vec<DeathsByDayT> {
    DeathsByDay::table
        .order(DeathsByDay::date.asc())
        .load::<DeathsByDayT>(conn)
        .expect("Error loading object")
}
