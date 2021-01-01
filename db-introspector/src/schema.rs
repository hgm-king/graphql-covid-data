table! {
    AntibodyByAge (index) {
        index -> Int8,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Int8>,
        NUM_PEOP_POS -> Nullable<Int8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DataByModzcta (index) {
        index -> Int8,
        MODIFIED_ZCTA -> Nullable<Int8>,
        NEIGHBORHOOD_NAME -> Nullable<Text>,
        BOROUGH_GROUP -> Nullable<Text>,
        COVID_CASE_COUNT -> Nullable<Int8>,
        COVID_CASE_RATE -> Nullable<Float8>,
        POP_DENOMINATOR -> Nullable<Float8>,
        COVID_DEATH_COUNT -> Nullable<Int8>,
        COVID_DEATH_RATE -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TOTAL_COVID_TESTS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

allow_tables_to_appear_in_same_query!(
    AntibodyByAge,
    DataByModzcta,
);
