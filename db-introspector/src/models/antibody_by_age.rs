use crate::establish_connection;
use crate::schema::AntibodyByAge;
use diesel::prelude::*;

#[derive(Debug,Insertable,Queryable)]
#[table_name="AntibodyByAge"]
pub struct AntibodyByAge_t {
    pub index: i64,
    pub demo_variable: Option<String>,
    pub NUM_PEOP_TEST: Option<i64>,
    pub NUM_PEOP_POS: Option<i64>,
    pub PERCENT_POSITIVE: Option<f64>,
    pub TEST_RATE: Option<f64>,
    pub date: Option<String>,
}

pub fn create(conn: &PgConnection, new_antibodies: &AntibodyByAge_t) -> AntibodyByAge_t {
    diesel::insert_into(AntibodyByAge::table)
        .values(new_antibodies)
        .get_result(conn)
        .expect("Error saving new post")
}

pub fn read(conn: &PgConnection) -> Vec<AntibodyByAge_t> {
    let hold = AntibodyByAge::table.filter(AntibodyByAge::PERCENT_POSITIVE.lt(0.2))
        .limit(50);

    hold.load::<AntibodyByAge_t>(conn)
        .expect("Error loading AntibodyByAge")
}

pub fn update(conn: &PgConnection, id: i64) -> AntibodyByAge_t {
    diesel::update(AntibodyByAge::table.find(id))
        .set(AntibodyByAge::demo_variable.eq("Boy if you dont..."))
        .get_result::<AntibodyByAge_t>(conn)
        .expect(&format!("Unable to find Antibody {}", id))
}

pub fn delete(conn: &PgConnection, id: i64) -> usize {
    diesel::delete(AntibodyByAge::table.filter(AntibodyByAge::index.eq(id)))
        .execute(conn)
        .expect("Error deleting Antibody")
}

// pub fn fetch_column(name: &str) -> () {
//
// }
