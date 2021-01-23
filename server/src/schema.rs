table! {
    antibody-by-age (id) {
        id -> Int4,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Float8>,
        NUM_PEOP_POS -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    antibody-by-boro (id) {
        id -> Int4,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Float8>,
        NUM_PEOP_POS -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    antibody-by-modzcta (id) {
        id -> Int4,
        modzcta_first -> Nullable<Float8>,
        NEIGHBORHOOD_NAME -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Float8>,
        NUM_PEOP_POS -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    antibody-by-poverty (id) {
        id -> Int4,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Float8>,
        NUM_PEOP_POS -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    antibody-by-sex (id) {
        id -> Int4,
        demo_variable -> Nullable<Text>,
        NUM_PEOP_TEST -> Nullable<Float8>,
        NUM_PEOP_POS -> Nullable<Float8>,
        PERCENT_POSITIVE -> Nullable<Float8>,
        TEST_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    by-age (id) {
        id -> Int4,
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
    by-boro (id) {
        id -> Int4,
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
    by-poverty (id) {
        id -> Int4,
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
    by-race (id) {
        id -> Int4,
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
    by-sex (id) {
        id -> Int4,
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
    data-by-modzcta (id) {
        id -> Int4,
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
    deaths-by-boro-age (id) {
        id -> Int4,
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
    group-death-by-boro (id) {
        id -> Int4,
        group -> Nullable<Text>,
        subgroup -> Nullable<Text>,
        BK_DEATH_COUNT -> Nullable<Float8>,
        BK_DEATH_RATE -> Nullable<Float8>,
        BX_DEATH_COUNT -> Nullable<Float8>,
        BX_DEATH_RATE -> Nullable<Float8>,
        MN_DEATH_COUNT -> Nullable<Float8>,
        MN_DEATH_RATE -> Nullable<Float8>,
        QN_DEATH_COUNT -> Nullable<Float8>,
        QN_DEATH_RATE -> Nullable<Float8>,
        SI_DEATH_COUNT -> Nullable<Float8>,
        SI_DEATH_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    group-hosp-by-boro (id) {
        id -> Int4,
        group -> Nullable<Text>,
        subgroup -> Nullable<Text>,
        BK_HOSPITALIZED_COUNT -> Nullable<Float8>,
        BK_HOSPITALIZED_RATE -> Nullable<Float8>,
        BX_HOSPITALIZED_COUNT -> Nullable<Float8>,
        BX_HOSPITALIZED_RATE -> Nullable<Float8>,
        MN_HOSPITALIZED_COUNT -> Nullable<Float8>,
        MN_HOSPITALIZED_RATE -> Nullable<Float8>,
        QN_HOSPITALIZED_COUNT -> Nullable<Float8>,
        QN_HOSPITALIZED_RATE -> Nullable<Float8>,
        SI_HOSPITALIZED_COUNT -> Nullable<Float8>,
        SI_HOSPITALIZED_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    probable-confirmed-by-age (id) {
        id -> Int4,
        AGE_GROUP -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    probable-confirmed-by-boro (id) {
        id -> Int4,
        BOROUGH_GROUP -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    probable-confirmed-by-location (id) {
        id -> Int4,
        LOCATION_OF_DEATH -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    probable-confirmed-by-race (id) {
        id -> Int4,
        RACE_GROUP -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    probable-confirmed-by-sex (id) {
        id -> Int4,
        SEX -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    summary (id) {
        id -> Int4,
        MEASURE -> Nullable<Text>,
        NUMBER_OF_NYC_RESIDENTS -> Nullable<Text>,
        date -> Nullable<Text>,
    }
}

allow_tables_to_appear_in_same_query!(
    antibody-by-age,
    antibody-by-boro,
    antibody-by-modzcta,
    antibody-by-poverty,
    antibody-by-sex,
    by-age,
    by-boro,
    by-poverty,
    by-race,
    by-sex,
    data-by-modzcta,
    deaths-by-boro-age,
    group-death-by-boro,
    group-hosp-by-boro,
    probable-confirmed-by-age,
    probable-confirmed-by-boro,
    probable-confirmed-by-location,
    probable-confirmed-by-race,
    probable-confirmed-by-sex,
    summary,
);
