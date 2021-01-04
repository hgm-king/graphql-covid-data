use crate::parser::*;

use std::path::Path;
use std::fs::File;
use std::io::Write;
use std::fmt;
type Result<T> = std::result::Result<T, ParseError>;

#[derive(Debug, Clone)]
pub struct ParseError;

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Could not parse the schema provided")
    }
}

fn convert_datatype_to_rust(data_type: &str) -> &str {
    match data_type {
        "Text" => "String",
        "Int8" => "i64",
        "Int4" => "i32",
        "Float8" => "f64",
        "Float4" => "f32",
        "Boolean" => "bool",
        _ => panic!("We have not covered this data type")
    }
}

fn generate_column(column: Column) -> String {
    match column {
        (name, (data_type, false)) => format!("\n    pub {}: {},", name, convert_datatype_to_rust(&data_type)),
        (name, (data_type, true)) => format!("\n    pub {}: Option<{}>,", name, convert_datatype_to_rust(&data_type)),
    }
}

pub fn generate_models(template: &str, tables: &Vec<Table>, save_path: &str) -> Result<usize> {
    let mut count = 0;

    for table in tables.iter() {
        let mut template_copy = template.to_string();

        let name = table.name.to_owned();
        let columns = table.columns.to_owned();
        let key = table.primary_key.to_owned();

        let mut column_string = String::new();

        for column in columns.into_iter() {
            column_string = format!("{}{}", column_string, generate_column(column));
        }

        template_copy = template_copy.replace("{table_name}", &name);
        template_copy = template_copy.replace("{columns}", &column_string);

        println!("{}", template_copy);
        save_file(format!("{}/{}.rs", save_path, name), &template_copy);

        count += 1;
    }

    Ok(count)
}

fn save_file(url: String, data: &str) -> () {
    let path = Path::new(&url);
    let display = path.display();

    // Open a file in write-only mode, returns `io::Result<File>`
    let mut file = match File::create(&path) {
        Err(why) => panic!("couldn't create {}: {}", display, why),
        Ok(file) => file,
    };

    // Write the `LOREM_IPSUM` string to `file`, returns `io::Result<()>`
    match file.write_all(data.as_bytes()) {
        Err(why) => panic!("couldn't write to {}: {}", display, why),
        Ok(_) => println!("successfully wrote to {}", display),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_columns() {
        assert_eq!(
            generate_column((String::from("index"), (String::from("Text"), false))),
            String::from("\n    pub index: String,")
        );
        assert_eq!(
            generate_column((String::from("index"), (String::from("Text"), true))),
            String::from("\n    pub index: Option<String>,")
        );
    }
}
