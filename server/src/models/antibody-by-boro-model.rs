/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::antibody-by-boro;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="antibody-by-boro"]
pub struct antibody-by-boroT {
    pub id: i32,
    pub demo_variable: Option<String>,
    pub NUM_PEOP_TEST: Option<f64>,
    pub NUM_PEOP_POS: Option<f64>,
    pub PERCENT_POSITIVE: Option<f64>,
    pub TEST_RATE: Option<f64>,
    pub date: Option<String>,
}

pub fn read(conn: &PgConnection) -> Vec<antibody-by-boroT> {
    antibody-by-boro::table
        .order(antibody-by-boro::date.asc())
        .load::<antibody-by-boroT>(conn)
        .expect("Error loading object")
}