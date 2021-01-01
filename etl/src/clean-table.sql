-- this is assuming that we put a date and index, which our pandas script definitely does

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
