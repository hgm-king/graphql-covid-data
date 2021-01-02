// use crate::print_query;
use crate::schema::AntibodyByAge;
use diesel::prelude::*;
use diesel::dsl::Eq;
use diesel::types::Int4;


macro_rules! match_column {
    ("index") => { AntibodyByAge::index };
    ("demo_variable") => { AntibodyByAge::demo_variable };
    ("NUM_PEOP_TEST") => { AntibodyByAge::NUM_PEOP_TEST };
    ("NUM_PEOP_POS") => { AntibodyByAge::NUM_PEOP_POS };
    ("PERCENT_POSITIVE") => { AntibodyByAge::PERCENT_POSITIVE };
    ("TEST_RATE") => { AntibodyByAge::TEST_RATE };
    ("date") => { AntibodyByAge::date };
}

macro_rules! match_clause {
    ($col:expr, "eq", $val:expr) => { $col.eq($val) };
    ($col:expr, "lt", $val:expr) => { $col.lt($val) };
    ($col:expr, "gt", $val:expr) => { $col.gt($val) };
}

#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="AntibodyByAge"]
pub struct AntibodyByAgeT {
    pub index: i32,
    pub demo_variable: Option<String>,
    pub NUM_PEOP_TEST: Option<i32>,
    pub NUM_PEOP_POS: Option<i32>,
    pub PERCENT_POSITIVE: Option<f64>,
    pub TEST_RATE: Option<f64>,
    pub date: Option<String>,
}

// fn with_equals<T, U>(id: U) -> Eq<T, U>
// where
//     T: match_column!("index"),
//     U: diesel::expression::AsExpression<Int4>,
// {
//     match_column!("index").eq(id)
// }

pub fn create(conn: &PgConnection, new_antibodies: &AntibodyByAgeT) -> AntibodyByAgeT {
    diesel::insert_into(AntibodyByAge::table)
        .values(new_antibodies)
        .get_result(conn)
        .expect("Error saving new Antibody")
}

pub fn read(conn: &PgConnection) -> Vec<AntibodyByAgeT> {
    let hold = AntibodyByAge::table
        .filter(match_clause!(match_column!("PERCENT_POSITIVE"), "lt", 0.2))
        .filter(match_clause!(match_column!("PERCENT_POSITIVE"), "gt", 0.1))
        .limit(50);

    hold.load::<AntibodyByAgeT>(conn)
        .expect("Error loading AntibodyByAge")
}


// An update statement is constructed by calling diesel::update(target).set(changes).
// The resulting statement is then run by calling either execute, get_result, or get_results.
pub fn update(conn: &PgConnection, id: i32) -> AntibodyByAgeT {
    // update a full table
    // let target = AntibodyByAge::table;

    // update a any query with only filter called on it
    let target = AntibodyByAge::table.filter(match_clause!(match_column!("index"), "eq", id));

    // third option is a perfectly matching struct to the table that implements Identifiable trait
    // I am unsure if we need that atm

    let query = diesel::update(target)
        .set(match_column!("demo_variable").eq("Boy if you dont..."));

    query.get_result::<AntibodyByAgeT>(conn)
        .expect(&format!("Unable to find Antibody {}", id))
}

pub fn delete(conn: &PgConnection, id: i32) -> usize {
    diesel::delete(AntibodyByAge::table.filter(match_clause!(match_column!("index"), "eq", id)))
        .execute(conn)
        .expect("Error deleting Antibody")
}
