table! {
    AntibodyByAge (index) {
        index -> Int4,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Float8>,
        NUM_PEOP_POS -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ByAge (index) {
        index -> Text,
        AGE_GROUP -> Nullable<Text>,
        CASE_RATE -> Nullable<Float8>,
        HOSPITALIZED_RATE -> Nullable<Float8>,
        DEATH_RATE -> Nullable<Float8>,
        CASE_COUNT -> Nullable<Float8>,
        HOSPITALIZED_COUNT -> Nullable<Float8>,
        DEATH_COUNT -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ByBoro (index) {
        index -> Text,
        BOROUGH_GROUP -> Nullable<Text>,
        CASE_RATE -> Nullable<Float8>,
        HOSPITALIZED_RATE -> Nullable<Float8>,
        DEATH_RATE -> Nullable<Float8>,
        CASE_COUNT -> Nullable<Float8>,
        HOSPITALIZED_COUNT -> Nullable<Float8>,
        DEATH_COUNT -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ByPoverty (index) {
        index -> Text,
        POVERTY_GROUP -> Nullable<Text>,
        CASE_RATE_ADJ -> Nullable<Float8>,
        HOSPITALIZED_RATE_ADJ -> Nullable<Float8>,
        DEATH_RATE_ADJ -> Nullable<Float8>,
        CASE_COUNT -> Nullable<Float8>,
        HOSPITALIZED_COUNT -> Nullable<Float8>,
        DEATH_COUNT -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ByRace (index) {
        index -> Int4,
        RACE_GROUP -> Nullable<Text>,
        CASE_RATE_ADJ -> Nullable<Float8>,
        HOSPITALIZED_RATE_ADJ -> Nullable<Float8>,
        DEATH_RATE_ADJ -> Nullable<Float8>,
        CASE_COUNT -> Nullable<Float8>,
        HOSPITALIZED_COUNT -> Nullable<Float8>,
        DEATH_COUNT -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    BySex (index) {
        index -> Text,
        SEX_GROUP -> Nullable<Text>,
        CASE_RATE -> Nullable<Float8>,
        HOSPITALIZED_RATE -> Nullable<Float8>,
        DEATH_RATE -> Nullable<Float8>,
        CASE_COUNT -> Nullable<Float8>,
        HOSPITALIZED_COUNT -> Nullable<Float8>,
        DEATH_COUNT -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DataByModzcta (index) {
        index -> Text,
        MODIFIED_ZCTA -> Nullable<Float8>,
        NEIGHBORHOOD_NAME -> Nullable<Text>,
        BOROUGH_GROUP -> Nullable<Text>,
        COVID_CASE_COUNT -> Nullable<Float8>,
        COVID_CASE_RATE -> Nullable<Float8>,
        POP_DENOMINATOR -> Nullable<Float8>,
        COVID_DEATH_COUNT -> Nullable<Float8>,
        COVID_DEATH_RATE -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TOTAL_COVID_TESTS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DeathsByBoro (index) {
        index -> Text,
        BOROUGH_GROUP -> Nullable<Text>,
        AGE_0_17_YRS -> Nullable<Float8>,
        AGE_18_24_YRS -> Nullable<Float8>,
        AGE_25_34_YRS -> Nullable<Float8>,
        AGE_35_44_YRS -> Nullable<Float8>,
        AGE_45_54_YRS -> Nullable<Float8>,
        AGE_55_64_YRS -> Nullable<Float8>,
        AGE_65_74_YRS -> Nullable<Float8>,
        AGE_GE_75_YRS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DeathsByRace (index) {
        index -> Text,
        RACE_GROUP -> Nullable<Text>,
        AGE_0_17_YRS -> Nullable<Float8>,
        AGE_18_24_YRS -> Nullable<Float8>,
        AGE_25_34_YRS -> Nullable<Float8>,
        AGE_35_44_YRS -> Nullable<Float8>,
        AGE_45_54_YRS -> Nullable<Float8>,
        AGE_55_64_YRS -> Nullable<Float8>,
        AGE_65_74_YRS -> Nullable<Float8>,
        AGE_GE_75_YRS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    Summary (index) {
        index -> Text,
        MEASURE -> Nullable<Text>,
        NUMBER_OF_NYC_RESIDENTS -> Nullable<Text>,
        date -> Nullable<Text>,
    }
}

allow_tables_to_appear_in_same_query!(
    AntibodyByAge,
    ByAge,
    ByBoro,
    ByPoverty,
    ByRace,
    BySex,
    DataByModzcta,
    DeathsByBoro,
    DeathsByRace,
    Summary,
);
