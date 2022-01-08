create table
"TestrateByModzctaPrime" (
	id SERIAL PRIMARY KEY,
	"ZCTA" int4,
	"TESTRATE" float8,
	date text
)

create table
"SummaryPrime" (
	id SERIAL PRIMARY KEY,
	"NYC_PROBABLE_CASE_COUNT" int4,
	"NYC_HOSPITALIZED_COUNT" int4,
	"NYC_CASE_COUNT" int4,
	"NYC_TOTAL_CASE_COUNT" int4,
	"NYC_TOTAL_DEATH_COUNT" int4,
	"DATE_UPDATED" text,
	"NYC_PROBABLE_DEATH_COUNT" int4,
	"NYC_CONFIRMED_DEATH_COUNT" int4,
	date text
);

CREATE TABLE public.coviddatafrontend (
	index SERIAL PRIMARY KEY,
	"version" varchar NULL,
	"date" varchar NULL
);

insert into public.coviddatafrontend ("version", "date") values ('1.0.0', '12/29/21');
