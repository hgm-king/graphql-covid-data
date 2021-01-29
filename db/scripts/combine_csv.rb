require 'csv'

data_dir = './data-by-modzcta/'

options = {
  headers: 1
}

Dir.foreach(data_dir) do |filename|
  next if filename == '.' or filename == '..'
  # Do work on the remaining files & directories
  i = 0
  CSV.foreach("#{data_dir}#{filename}", **options) do |row|
    i += 1
    puts <<HERE
INSERT INTO "DataByModzcta"
("MODIFIED_ZCTA", "NEIGHBORHOOD_NAME", "BOROUGH_GROUP", "COVID_CASE_COUNT", "COVID_CASE_RATE", "POP_DENOMINATOR", "COVID_DEATH_COUNT", "COVID_DEATH_RATE", "PERCENT_POSITIVE", "TOTAL_COVID_TESTS", date)
VALUES
(#{row["MODIFIED_ZCTA"]}, '#{row["NEIGHBORHOOD_NAME"] ? row["NEIGHBORHOOD_NAME"].gsub(/'/, "''") : nil}', '#{row["BOROUGH_GROUP"]}', #{row["COVID_CASE_COUNT"]}, #{row["COVID_CASE_RATE"]}, #{row["POP_DENOMINATOR"]}, #{row["COVID_DEATH_COUNT"]}, #{row["COVID_DEATH_RATE"]}, #{row["PERCENT_POSITIVE"]}, #{row["TOTAL_COVID_TESTS"] ? row["TOTAL_COVID_TESTS"] : -1}, '#{filename.gsub(/\.csv/, "")}');\n
HERE

  end
end
