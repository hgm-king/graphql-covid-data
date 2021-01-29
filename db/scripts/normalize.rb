require 'csv'

csv_file = './trends/testrate-by-modzcta.csv'
table_name = "PercentpositiveByModzctaPrime"

f = File.new(csv_file, "r")

options = {
  headers: true
}

csv = CSV.new(f, **options)
rows = csv.read
rows.each do |row|
  row.select {|header, value| header =~ /_\d{5}/}.each do |header, value|
    puts <<HERE
INSERT INTO "#{table_name}"
("ZCTA", "PCTPOS", date)
VALUES
(#{(header.gsub(/[^_]*_/, ""))}, #{value}, '#{row['week_ending']}');\n
HERE
  end
end
