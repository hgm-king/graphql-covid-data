table! {
    ByAge (id) {
        id -> Int4,
        AGE_GROUP -> Nullable<Text>,
        CONFIRMED_CASE_RATE -> Nullable<Float8>,
        CASE_RATE -> Nullable<Float8>,
        HOSPITALIZED_RATE -> Nullable<Float8>,
        DEATH_RATE -> Nullable<Float8>,
        CONFIRMED_CASE_COUNT -> Nullable<Float8>,
        PROBABLE_CASE_COUNT -> Nullable<Float8>,
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
        CONFIRMED_CASE_RATE_ADJ -> Nullable<Float8>,
        CASE_RATE_ADJ -> Nullable<Float8>,
        HOSPITALIZED_RATE_ADJ -> Nullable<Float8>,
        DEATH_RATE_ADJ -> Nullable<Float8>,
        CONFIRMED_CASE_COUNT -> Nullable<Float8>,
        PROBABLE_CASE_COUNT -> Nullable<Float8>,
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
        CONFIRMED_CASE_RATE_ADJ -> Nullable<Float8>,
        CASE_RATE_ADJ -> Nullable<Float8>,
        HOSPITALIZED_RATE_ADJ -> Nullable<Float8>,
        DEATH_RATE_ADJ -> Nullable<Float8>,
        CONFIRMED_CASE_COUNT -> Nullable<Float8>,
        PROBABLE_CASE_COUNT -> Nullable<Float8>,
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
        CONFIRMED_CASE_RATE -> Nullable<Float8>,
        CASE_RATE -> Nullable<Float8>,
        HOSPITALIZED_RATE -> Nullable<Float8>,
        DEATH_RATE -> Nullable<Float8>,
        CONFIRMED_CASE_COUNT -> Nullable<Float8>,
        PROBABLE_CASE_COUNT -> Nullable<Float8>,
        CASE_COUNT -> Nullable<Float8>,
        HOSPITALIZED_COUNT -> Nullable<Float8>,
        DEATH_COUNT -> Nullable<Float8>,
        date -> Nullable<Text>,
    }
}

table! {
    DataByDay (id) {
        id -> Int4,
        date_of_interest -> Nullable<Text>,
        CASE_COUNT -> Nullable<Int4>,
        PROBABLE_CASE_COUNT -> Nullable<Int4>,
        HOSPITALIZED_COUNT -> Nullable<Int4>,
        DEATH_COUNT -> Nullable<Int4>,
        PROBABLE_DEATH_COUNT -> Nullable<Int4>,
    }
}

table! {
    DataByModzcta (id) {
        id -> Int4,
        MODIFIED_ZCTA -> Nullable<Float8>,
        NEIGHBORHOOD_NAME -> Nullable<Text>,
        BOROUGH_GROUP -> Nullable<Text>,
        label -> Nullable<Text>,
        lat -> Nullable<Float8>,
        lon -> Nullable<Float8>,
        COVID_CONFIRMED_CASE_COUNT -> Nullable<Float8>,
        COVID_PROBABLE_CASE_COUNT -> Nullable<Float8>,
        COVID_CASE_COUNT -> Nullable<Float8>,
        COVID_CONFIRMED_CASE_RATE -> Nullable<Float8>,
        COVID_CASE_RATE -> Nullable<Float8>,
        POP_DENOMINATOR -> Nullable<Float8>,
        COVID_CONFIRMED_DEATH_COUNT -> Nullable<Float8>,
        COVID_PROBABLE_DEATH_COUNT -> Nullable<Float8>,
        COVID_DEATH_COUNT -> Nullable<Float8>,
        COVID_CONFIRMED_DEATH_RATE -> Nullable<Float8>,
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
    Summary (id) {
        id -> Int4,
        MEASURE -> Nullable<Text>,
        NUMBER_OF_NYC_RESIDENTS -> Nullable<Text>,
        date -> Nullable<Text>,
    }
}

table! {
    SummaryPrime (id) {
        id -> Int4,
        NYC_PROBABLE_CASE_COUNT -> Nullable<Int4>,
        NYC_HOSPITALIZED_COUNT -> Nullable<Int4>,
        NYC_CASE_COUNT -> Nullable<Int4>,
        NYC_TOTAL_CASE_COUNT -> Nullable<Int4>,
        NYC_TOTAL_DEATH_COUNT -> Nullable<Int4>,
        DATE_UPDATED -> Nullable<Text>,
        NYC_PROBABLE_DEATH_COUNT -> Nullable<Int4>,
        NYC_CONFIRMED_DEATH_COUNT -> Nullable<Int4>,
        date -> Nullable<Text>,
    }
}

table! {
    ZctaToModzcta (id) {
        id -> Int4,
        ZCTA -> Nullable<Float8>,
        MODZCTA -> Nullable<Float8>,
    }
}

table! {
    coviddatafrontend (index) {
        index -> Int4,
        version -> Nullable<Text>,
        date -> Nullable<Text>,
    }
}

allow_tables_to_appear_in_same_query!(
    ByAge,
    ByPoverty,
    ByRace,
    BySex,
    DataByDay,
    DataByModzcta,
    DeathsByBoroAge,
    DeathsByRaceAge,
    DeathsByUnderlyingConditions,
    Summary,
    SummaryPrime,
    ZctaToModzcta,
    coviddatafrontend,
);
