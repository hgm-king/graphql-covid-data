table! {
    AntibodyByAge (index) {
        index -> Int4,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Int4>,
        NUM_PEOP_POS -> Nullable<Int4>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DataByModzcta (index) {
        index -> Int4,
        MODIFIED_ZCTA -> Nullable<Int4>,
        NEIGHBORHOOD_NAME -> Nullable<Text>,
        BOROUGH_GROUP -> Nullable<Text>,
        COVID_CASE_COUNT -> Nullable<Int4>,
        COVID_CASE_RATE -> Nullable<Float8>,
        POP_DENOMINATOR -> Nullable<Float8>,
        COVID_DEATH_COUNT -> Nullable<Int4>,
        COVID_DEATH_RATE -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TOTAL_COVID_TESTS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}

allow_tables_to_appear_in_same_query!(
    AntibodyByAge,
    DataByModzcta,
    posts,
);
