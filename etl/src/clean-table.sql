-- this is assuming that we put a date and index, which our pandas script definitely does
-- you need to run this to make sure the code will work
-- another thing is that graphql doesnt allow Int8 so make sure to update that in your tables or else graphql will yell at you

update "{table_name}" og
set index = rn.row_number
from (
	select index, date, row_number() over (order by t.date ASC)
	from "{table_name}" t
) rn
where og."date" = rn."date"
and og.index = rn.index

ALTER TABLE "{table_name}"
ADD PRIMARY KEY (index)
