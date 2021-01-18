-- this is assuming that we put a date and index, which our pandas script definitely does
-- you need to run this to make sure the code will work
-- another thing is that graphql doesnt allow Int8 so make sure to update that in your tables or else graphql will yell at you

update "ByRace" og
set index = rn.row_number
from (
	select index, date, row_number() over (order by t.date ASC)
	from "ByRace" t
) rn
where og."date" = rn."date"
and og.index = rn.index;

-- this is needed for the antibody table specifically,
-- you may notice they commited a file with a git conflict >>>HEAD bit
delete from "ByRace" where demo_variable is null;

ALTER TABLE "ByRace" aba
DROP COLUMN "<<<<<<< HEAD";

ALTER TABLE "ByRace"
ADD PRIMARY KEY (index);

ALTER TABLE "ByRace"
ALTER COLUMN index [SET DATA] TYPE int4
