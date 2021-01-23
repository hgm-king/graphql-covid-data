/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::summary;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="summary"]
pub struct summaryT {
    pub id: i32,
    pub MEASURE: Option<String>,
    pub NUMBER_OF_NYC_RESIDENTS: Option<String>,
    pub date: Option<String>,
}

pub fn read(conn: &PgConnection) -> Vec<summaryT> {
    summary::table
        .order(summary::date.asc())
        .load::<summaryT>(conn)
        .expect("Error loading object")
}