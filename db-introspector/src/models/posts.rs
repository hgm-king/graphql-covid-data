extern crate db_introspector;
extern crate diesel;

use db_introspector::*;
use self::models::*;
use diesel::prelude::*;

pub fn print_posts() {
    use db_introspector::schema::AntibodyByAge::dsl::*;

    let connection = establish_connection();
    let results = AntibodyByAge.filter(PERCENT_POSITIVE.lt(0.2))
        .limit(50)
        .load::<Antibody_by_age>(&connection)
        .expect("Error loading AntibodyByAge");

    println!("Displaying {} AntibodyByAge", results.len());
    for row in results {
        println!("{:?}", row);
        println!("----------\n");
    }
}
