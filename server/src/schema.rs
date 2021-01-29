table! {
    AntibodyByAge (id) {
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
    AntibodyByBoro (id) {
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
    AntibodyByModzcta (id) {
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
    AntibodyByPoverty (id) {
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
    AntibodyBySex (id) {
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
    ByAge (id) {
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
    ByBoro (id) {
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
    ByPoverty (id) {
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
    ByRace (id) {
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
    BySex (id) {
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
    CaserateByModzctaPrime (id) {
        id -> Int4,
        MODZCTA -> Nullable<Int4>,
        CASERATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DataByModzcta (id) {
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
    DeathsByBoroAge (id) {
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
    DeathsByRaceAge (id) {
        id -> Int4,
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
    DeathsByUnderlyingConditions (id) {
        id -> Int4,
        AGE_GROUP -> Nullable<Text>,
        DEATH_COUNT_TOTAL -> Nullable<Float8>,
        DEATH_COUNT_ILLNESS -> Nullable<Float8>,
        DEATH_COUNT_NO_ILLNESS -> Nullable<Float8>,
        DEATH_COUNT_PENDING_ILLNESS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    GroupCasesByBoro (id) {
        id -> Int4,
        group -> Nullable<Text>,
        subgroup -> Nullable<Text>,
        BK_CASE_COUNT -> Nullable<Float8>,
        BK_CASE_RATE -> Nullable<Float8>,
        BX_CASE_COUNT -> Nullable<Float8>,
        BX_CASE_RATE -> Nullable<Float8>,
        MN_CASE_COUNT -> Nullable<Float8>,
        MN_CASE_RATE -> Nullable<Float8>,
        QN_CASE_COUNT -> Nullable<Float8>,
        QN_CASE_RATE -> Nullable<Float8>,
        SI_CASE_COUNT -> Nullable<Float8>,
        SI_CASE_RATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    GroupDeathByBoro (id) {
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
    GroupHospByBoro (id) {
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
    HospByDay (id) {
        id -> Int4,
        date_of_interest -> Nullable<Text>,
        HOSPITALIZED_COUNT -> Nullable<Int8>,
        HOSP_COUNT_7DAY_AVG -> Nullable<Int8>,
        BX_HOSPITALIZED_COUNT -> Nullable<Int8>,
        BX_HOSPITALIZED_COUNT_7DAY_AVG -> Nullable<Int8>,
        BK_HOSPITALIZED_COUNT -> Nullable<Int8>,
        BK_HOSPITALIZED_COUNT_7DAY_AVG -> Nullable<Int8>,
        MN_HOSPITALIZED_COUNT -> Nullable<Int8>,
        MN_HOSPITALIZED_COUNT_7DAY_AVG -> Nullable<Int8>,
        QN_HOSPITALIZED_COUNT -> Nullable<Int8>,
        QN_HOSPITALIZED_COUNT_7DAY_AVG -> Nullable<Int8>,
        SI_HOSPITALIZED_COUNT -> Nullable<Int8>,
        SI_HOSPITALIZED_COUNT_7DAY_AVG -> Nullable<Int8>,
        INCOMPLETE -> Nullable<Int8>,
    }
}

table! {
    PercentpositiveByModzctaPrime (id) {
        id -> Int4,
        MODZCTA -> Nullable<Int4>,
        PCTPOS -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ProbableConfirmedByAge (id) {
        id -> Int4,
        AGE_GROUP -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ProbableConfirmedByBoro (id) {
        id -> Int4,
        BOROUGH_GROUP -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ProbableConfirmedByLocation (id) {
        id -> Int4,
        LOCATION_OF_DEATH -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ProbableConfirmedByRace (id) {
        id -> Int4,
        RACE_GROUP -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ProbableConfirmedBySex (id) {
        id -> Int4,
        SEX -> Nullable<Text>,
        CONFIRMED_DEATH -> Nullable<Float8>,
        PROBABLE_DEATH -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    Summary (id) {
        id -> Int4,
        MEASURE -> Nullable<Text>,
        NUMBER_OF_NYC_RESIDENTS -> Nullable<Text>,
        date -> Nullable<Text>,
    }
}

table! {
    TestrateByModzctaPrime (id) {
        id -> Int4,
        MODZCTA -> Nullable<Int4>,
        TESTRATE -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    ZctaToModzcta (id) {
        id -> Int4,
        ZCTA -> Nullable<Int8>,
        MODZCTA -> Nullable<Int8>,
    }
}

allow_tables_to_appear_in_same_query!(
    AntibodyByAge,
    AntibodyByBoro,
    AntibodyByModzcta,
    AntibodyByPoverty,
    AntibodyBySex,
    ByAge,
    ByBoro,
    ByPoverty,
    ByRace,
    BySex,
    CaserateByModzctaPrime,
    DataByModzcta,
    DeathsByBoroAge,
    DeathsByRaceAge,
    DeathsByUnderlyingConditions,
    GroupCasesByBoro,
    GroupDeathByBoro,
    GroupHospByBoro,
    HospByDay,
    PercentpositiveByModzctaPrime,
    ProbableConfirmedByAge,
    ProbableConfirmedByBoro,
    ProbableConfirmedByLocation,
    ProbableConfirmedByRace,
    ProbableConfirmedBySex,
    Summary,
    TestrateByModzctaPrime,
    ZctaToModzcta,
);
