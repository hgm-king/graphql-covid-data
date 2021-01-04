use db_introspector::parser::parse_schema;
use db_introspector::generator::generate_models;

use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn main() {

    let schema_string = open_file("./src/schema.rs");
    let template_string = open_file("./templates/empty.txt");

    let schema = parse_schema(&schema_string).expect("Error parsing your schema");
    let models_path = "./src/models";

    generate_models(&template_string, &schema, models_path);
}

fn open_file(url: &str) -> String {
    let path = Path::new(url);
    let display = path.display();

    // Open the path in read-only mode, returns `io::Result<File>`
    let mut file = match File::open(&path) {
        Err(why) => panic!("couldn't open {}: {}", display, why),
        Ok(file) => file,
    };

    // Read the file contents into a string, returns `io::Result<usize>`
    let mut s = String::new();
    match file.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read {}: {}", display, why),
        Ok(_) => print!("{} contains:\n{}", display, s),
    }

    return s;
}
