ALTER TABLE "ByAge" ADD PRIMARY KEY (id);
ALTER TABLE "ByBoro" ADD PRIMARY KEY (id);
ALTER TABLE "ByPoverty" ADD PRIMARY KEY (id);
ALTER TABLE "ByRace" ADD PRIMARY KEY (id);
ALTER TABLE "BySex" ADD PRIMARY KEY (id);
ALTER TABLE "DataByModzcta" ADD PRIMARY KEY (id);
ALTER TABLE "DeathsByBoroAge" ADD PRIMARY KEY (id);
ALTER TABLE "DeathsByRaceAge" ADD PRIMARY KEY (id);
ALTER TABLE "DeathsByUnderlyingConditions" ADD PRIMARY KEY (id);
ALTER TABLE "Summary" ADD PRIMARY KEY (id);
ALTER TABLE "ZctaToModzcta" ADD PRIMARY KEY (id);
ALTER TABLE "coviddatafrontend" ADD PRIMARY KEY (index);
ALTER TABLE public.coviddatafrontend ALTER COLUMN "index" TYPE int4 USING "index"::int4;

ALTER TABLE "DataByDay" ADD PRIMARY KEY (id);
ALTER TABLE public."DataByDay" DROP COLUMN "BX_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_PROBABLE_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_HOSPITALIZED_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_PROBABLE_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_ALL_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_HOSPITALIZED_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BX_ALL_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_PROBABLE_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_HOSPITALIZED_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_PROBABLE_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_ALL_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_HOSPITALIZED_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "BK_ALL_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_PROBABLE_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_HOSPITALIZED_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_PROBABLE_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_ALL_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_HOSPITALIZED_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "MN_ALL_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_PROBABLE_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_HOSPITALIZED_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_PROBABLE_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_ALL_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_HOSPITALIZED_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "QN_ALL_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_PROBABLE_CASE_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_HOSPITALIZED_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_PROBABLE_DEATH_COUNT";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_ALL_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_HOSPITALIZED_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "SI_ALL_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "ALL_CASE_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "HOSP_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "ALL_DEATH_COUNT_7DAY_AVG";
ALTER TABLE public."DataByDay" DROP COLUMN "INCOMPLETE";
ALTER TABLE public."DataByDay" ALTER COLUMN "CASE_COUNT" TYPE int4 USING "CASE_COUNT"::int4;
ALTER TABLE public."DataByDay" ALTER COLUMN "PROBABLE_CASE_COUNT" TYPE int4 USING "PROBABLE_CASE_COUNT"::int4;
ALTER TABLE public."DataByDay" ALTER COLUMN "HOSPITALIZED_COUNT" TYPE int4 USING "HOSPITALIZED_COUNT"::int4;
ALTER TABLE public."DataByDay" ALTER COLUMN "DEATH_COUNT" TYPE int4 USING "DEATH_COUNT"::int4;
ALTER TABLE public."DataByDay" ALTER COLUMN "PROBABLE_DEATH_COUNT" TYPE int4 USING "PROBABLE_DEATH_COUNT"::int4;


ALTER TABLE public."ZctaToModzcta" ALTER COLUMN "ZCTA" TYPE float8 USING "ZCTA"::float8;
ALTER TABLE public."ZctaToModzcta" ALTER COLUMN "MODZCTA" TYPE float8 USING "MODZCTA"::float8;





select count(*) from public."Summary" s ;
