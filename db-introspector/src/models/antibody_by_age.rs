// the model for antibody by age
// I would love for this to be generated
// with full crud capabilities; everything a basic sql user could do

// useful recs
// https://diesel.rs/guides/composing-applications/
// https://diesel.rs/guides/schema-in-depth/

/*
I want to be able to compose a query like so
let where_clause = {
    index: { EQ: 3 },
    PERCENT_POSITIVE: { LT: 10 },
}

for attr, value in where_clause {
    query = compose(query, attr, value)
}

query.execute()

but this is really hard to compose because we need to return intermediate queries
which have a very specific type
*/

use crate::schema::AntibodyByAge;
use diesel::prelude::*;
use diesel::dsl::Eq;
use diesel::types::{Int4, Text};

/*
it is really hard to return a column using a regular function
what is the function signature for something that does that??
these do not have a proper generic type that works for each one

fn return_column() -> crate::schema::AntibodyByAge::index {}

// this is the closest I have gotten
// but we get an error with associated constants
fn return_column() -> diesel::query_source::Column<SqlType = Text, Table = AntibodyByAge::table> {
    AntibodyByAge::index
}
*/


// returning with a macro isnt much help
macro_rules! match_column {
    ("index") => { AntibodyByAge::index };
    ("demo_variable") => { AntibodyByAge::demo_variable };
    ("NUM_PEOP_TEST") => { AntibodyByAge::NUM_PEOP_TEST };
    ("NUM_PEOP_POS") => { AntibodyByAge::NUM_PEOP_POS };
    ("PERCENT_POSITIVE") => { AntibodyByAge::PERCENT_POSITIVE };
    ("TEST_RATE") => { AntibodyByAge::TEST_RATE };
    ("date") => { AntibodyByAge::date };
}

// this is the best I can do but it will be hard and ugly
macro_rules! match_clause {
    ($col:expr, "eq", $val:expr) => { $col.eq($val) };
    ($col:expr, "lt", $val:expr) => { $col.lt($val) };
    ($col:expr, "gt", $val:expr) => { $col.gt($val) };
}

#[derive(Debug,GraphQLObject,Insertable,Queryable,)]
#[table_name="AntibodyByAge"]
pub struct AntibodyByAgeT {
    pub index: String,
    pub demo_variable: Option<String>,
    pub NUM_PEOP_TEST: Option<f64>,
    pub NUM_PEOP_POS: Option<f64>,
    pub PERCENT_POSITIVE: Option<f64>,
    pub TEST_RATE: Option<f64>,
    pub date: Option<String>,
}

/*
type WithEquals<'a> = Eq<diesel::query_source::Column<SqlType = Text, Table = AntibodyByAge::table>, &'a str>;

// imagine being able to call many of these, with_equals("index", 64), with_lt, with_contains
// https://diesel.rs/guides/composing-applications/
fn with_equals(id: &str) -> WithEquals {
    AntibodyByAge::index.eq(id)
}
*/

pub fn create(conn: &PgConnection, new_antibodies: &AntibodyByAgeT) -> AntibodyByAgeT {
    diesel::insert_into(AntibodyByAge::table)
        .values(new_antibodies)
        .get_result(conn)
        .expect("Error saving new Antibody")
}

pub fn read(conn: &PgConnection) -> Vec<AntibodyByAgeT> {
    AntibodyByAge::table
        .load::<AntibodyByAgeT>(conn)
        .expect("Error loading AntibodyByAge")
}


// An update statement is constructed by calling diesel::update(target).set(changes).
// The resulting statement is then run by calling either execute, get_result, or get_results.
pub fn update(conn: &PgConnection, id: &str) -> AntibodyByAgeT {
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

pub fn delete(conn: &PgConnection, id: &str) -> usize {
    diesel::delete(AntibodyByAge::table.filter(match_clause!(match_column!("index"), "eq", id)))
        .execute(conn)
        .expect("Error deleting Antibody")
}
