fn main() {
    println!("Hello, world!");

    let connection = db_introspector::establish_connection();
    let results = db_introspector::models::antibody_by_age::read(&connection);

    println!("Displaying {} AntibodyByAge", results.len());
    for row in results {
        println!("{:?}", row);
        println!("----------\n");
    }

    let index_t = 131;
    let demo_variable_t = Some(String::from("Old, Babey"));
    let NUM_PEOP_TEST_t = Some(11);
    let NUM_PEOP_POS_t = Some(12);
    let PERCENT_POSITIVE_t = Some(1.0);
    let TEST_RATE_t = Some(27.0);
    let date_t = Some(String::from("2020-12-10T17:59:40Z"));

    let new_antibodies = db_introspector::models::antibody_by_age::AntibodyByAge_t {
        index: index_t,
        demo_variable: demo_variable_t,
        NUM_PEOP_TEST: NUM_PEOP_TEST_t,
        NUM_PEOP_POS: NUM_PEOP_POS_t,
        PERCENT_POSITIVE: PERCENT_POSITIVE_t,
        TEST_RATE: TEST_RATE_t,
        date: date_t,
    };

    // let results = db_introspector::models::antibody_by_age::create(&connection, &new_antibodies);
    // let results = db_introspector::models::antibody_by_age::delete(&connection, index_t);

}
