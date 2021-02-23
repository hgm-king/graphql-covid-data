# NYC_PROBABLE_CASE_COUNT
# NYC_HOSPITALIZED_COUNT
# NYC_CASE_COUNT
# NYC_TOTAL_CASE_COUNT
# NYC_TOTAL_DEATH_COUNT
# DATE_UPDATED
# NYC_PROBABLE_DEATH_COUNT
# NYC_CONFIRMED_DEATH_COUNT

require 'csv'

data_dir = './data/totals/summary/'
table_name = "SummaryPrime"

options = {
  headers: true
}

Dir.foreach(data_dir) do |filename|
  next if filename == '.' or filename == '..'
  # Do work on the remaining files & directories
  i = 0
  data = {}
  CSV.foreach("#{data_dir}#{filename}", **options) do |row|
    data[row["MEASURE"]] = row["NUMBER_OF_NYC_RESIDENTS"]
  end
  # puts data
  # puts "\n---\n"
  puts <<HERE
INSERT INTO "#{table_name}"
("NYC_PROBABLE_CASE_COUNT", "NYC_HOSPITALIZED_COUNT", "NYC_CASE_COUNT", "NYC_TOTAL_CASE_COUNT", "NYC_TOTAL_DEATH_COUNT", "DATE_UPDATED", "NYC_PROBABLE_DEATH_COUNT", "NYC_CONFIRMED_DEATH_COUNT", date)
VALUES
(#{data["NYC_PROBABLE_CASE_COUNT"] ? data["NYC_PROBABLE_CASE_COUNT"]: 'null' },
  #{data["NYC_HOSPITALIZED_COUNT"] ? data["NYC_HOSPITALIZED_COUNT"] : 'null'},
  #{data["NYC_CASE_COUNT"] ? data["NYC_CASE_COUNT"]: 'null'},
  #{data["NYC_TOTAL_CASE_COUNT"] ? data["NYC_TOTAL_CASE_COUNT"] : 'null'},
  #{data["NYC_TOTAL_DEATH_COUNT"] ? data["NYC_TOTAL_DEATH_COUNT"] : 'null'},
  #{data["DATE_UPDATED"] ? "'#{data["DATE_UPDATED"]}'" : 'null'},
  #{data["NYC_PROBABLE_DEATH_COUNT"] ? data["NYC_PROBABLE_DEATH_COUNT"] : 'null'},
  #{data["NYC_CONFIRMED_DEATH_COUNT"] ? data["NYC_CONFIRMED_DEATH_COUNT"] : 'null'},
  '#{filename.gsub(/\.csv/, "")}'
);\n
HERE

end
