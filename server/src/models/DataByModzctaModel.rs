use crate::models::ZctaToModzctaModel::ZctaToModzctaT;
/**
 * {file_name}
 * This file was generated by the db-schema-generator
 *
 * Happy Hacking!
**/
use crate::schema::{DataByModzcta, ZctaToModzcta};
use diesel::prelude::*;

#[derive(Debug, GraphQLObject, Insertable, Queryable)]
#[table_name = "DataByModzcta"]
pub struct DataByModzctaT {
    pub id: i32,
    pub MODIFIED_ZCTA: Option<f64>,
    pub NEIGHBORHOOD_NAME: Option<String>,
    pub BOROUGH_GROUP: Option<String>,
    pub label: Option<String>,
    pub lat: Option<f64>,
    pub lon: Option<f64>,
    pub COVID_CONFIRMED_CASE_COUNT: Option<f64>,
    pub COVID_PROBABLE_CASE_COUNT: Option<f64>,
    pub COVID_CASE_COUNT: Option<f64>,
    pub COVID_CONFIRMED_CASE_RATE: Option<f64>,
    pub COVID_CASE_RATE: Option<f64>,
    pub POP_DENOMINATOR: Option<f64>,
    pub COVID_CONFIRMED_DEATH_COUNT: Option<f64>,
    pub COVID_PROBABLE_DEATH_COUNT: Option<f64>,
    pub COVID_DEATH_COUNT: Option<f64>,
    pub COVID_CONFIRMED_DEATH_RATE: Option<f64>,
    pub COVID_DEATH_RATE: Option<f64>,
    pub PERCENT_POSITIVE: Option<f64>,
    pub TOTAL_COVID_TESTS: Option<f64>,
    pub date: Option<String>,
}

pub fn read(conn: &PgConnection) -> Vec<DataByModzctaAndZctaTuple> {
    DataByModzcta::table
        .left_join(ZctaToModzcta::table.on(ZctaToModzcta::MODZCTA.eq(DataByModzcta::MODIFIED_ZCTA)))
        .filter(DataByModzcta::date.eq("2021-03-12T17:57:33Z"))
        .order(ZctaToModzcta::ZCTA.asc())
        .load::<DataByModzctaAndZctaTuple>(conn)
        .expect("Error loading object")
}

#[derive(Debug, GraphQLObject)]
pub struct DataByModzctaWithZctaT {
    pub id: i32,
    pub MODIFIED_ZCTA: Option<f64>,
    pub ZCTA: Option<f64>,
    pub NEIGHBORHOOD_NAME: Option<String>,
    pub BOROUGH_GROUP: Option<String>,
    pub label: Option<String>,
    pub lat: Option<f64>,
    pub lon: Option<f64>,
    pub COVID_CONFIRMED_CASE_COUNT: Option<f64>,
    pub COVID_PROBABLE_CASE_COUNT: Option<f64>,
    pub COVID_CASE_COUNT: Option<f64>,
    pub COVID_CONFIRMED_CASE_RATE: Option<f64>,
    pub COVID_CASE_RATE: Option<f64>,
    pub POP_DENOMINATOR: Option<f64>,
    pub COVID_CONFIRMED_DEATH_COUNT: Option<f64>,
    pub COVID_PROBABLE_DEATH_COUNT: Option<f64>,
    pub COVID_DEATH_COUNT: Option<f64>,
    pub COVID_CONFIRMED_DEATH_RATE: Option<f64>,
    pub COVID_DEATH_RATE: Option<f64>,
    pub PERCENT_POSITIVE: Option<f64>,
    pub TOTAL_COVID_TESTS: Option<f64>,
    pub date: Option<String>,
}

impl DataByModzctaWithZctaT {
    pub fn new(data_by_modzcta: DataByModzctaT, zcta_to_modzcta: ZctaToModzctaT) -> Self {
        DataByModzctaWithZctaT {
            id: data_by_modzcta.id,
            MODIFIED_ZCTA: data_by_modzcta.MODIFIED_ZCTA,
            ZCTA: zcta_to_modzcta.ZCTA,
            NEIGHBORHOOD_NAME: data_by_modzcta.NEIGHBORHOOD_NAME,
            BOROUGH_GROUP: data_by_modzcta.BOROUGH_GROUP,
            label: data_by_modzcta.label,
            lat: data_by_modzcta.lat,
            lon: data_by_modzcta.lon,
            COVID_CONFIRMED_CASE_COUNT: data_by_modzcta.COVID_CONFIRMED_CASE_COUNT,
            COVID_PROBABLE_CASE_COUNT: data_by_modzcta.COVID_PROBABLE_CASE_COUNT,
            COVID_CASE_COUNT: data_by_modzcta.COVID_CASE_COUNT,
            COVID_CONFIRMED_CASE_RATE: data_by_modzcta.COVID_CONFIRMED_CASE_RATE,
            COVID_CASE_RATE: data_by_modzcta.COVID_CASE_RATE,
            POP_DENOMINATOR: data_by_modzcta.POP_DENOMINATOR,
            COVID_CONFIRMED_DEATH_COUNT: data_by_modzcta.COVID_CONFIRMED_DEATH_COUNT,
            COVID_PROBABLE_DEATH_COUNT: data_by_modzcta.COVID_PROBABLE_DEATH_COUNT,
            COVID_DEATH_COUNT: data_by_modzcta.COVID_DEATH_COUNT,
            COVID_CONFIRMED_DEATH_RATE: data_by_modzcta.COVID_CONFIRMED_DEATH_RATE,
            COVID_DEATH_RATE: data_by_modzcta.COVID_DEATH_RATE,
            PERCENT_POSITIVE: data_by_modzcta.PERCENT_POSITIVE,
            TOTAL_COVID_TESTS: data_by_modzcta.TOTAL_COVID_TESTS,
            date: data_by_modzcta.date,
        }
    }
}

pub type DataByModzctaAndZctaTuple = (DataByModzctaT, Option<ZctaToModzctaT>);
pub fn to_DataByModzctaWithZctaT(tup: DataByModzctaAndZctaTuple) -> DataByModzctaWithZctaT {
    let data_by_modzcta = tup.0;
    let zcta_to_modzcta = tup.1.unwrap();

    DataByModzctaWithZctaT::new(data_by_modzcta, zcta_to_modzcta)
}
