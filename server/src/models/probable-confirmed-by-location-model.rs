/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/

use crate::schema::probable-confirmed-by-location;
use diesel::prelude::*;


#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="probable-confirmed-by-location"]
pub struct probable-confirmed-by-locationT {
    pub id: i32,
    pub LOCATION_OF_DEATH: Option<String>,
    pub CONFIRMED_DEATH: Option<f64>,
    pub PROBABLE_DEATH: Option<f64>,
    pub date: Option<String>,
}

pub fn read(conn: &PgConnection) -> Vec<probable-confirmed-by-locationT> {
    probable-confirmed-by-location::table
        .order(probable-confirmed-by-location::date.asc())
        .load::<probable-confirmed-by-locationT>(conn)
        .expect("Error loading object")
}