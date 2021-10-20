use dotenv::dotenv;
use log::info;
use std::env;

#[derive(Clone)]
pub struct Config {
    pub app_addr: String,
    pub tls: bool,
    pub cert_path: Option<String>,
    pub key_path: Option<String>,
    pub db_path: String,
    pub is_mocking: bool,
}

impl Config {
    pub fn new(is_mocking: bool) -> Self {
        info!("🤖 Configuring the application!");
        dotenv().ok();

        // app fields
        let app_host = env::var("HOST").expect("HOST must be set");
        let app_port = env::var("PORT").expect("PORT must be set");
        let app_addr = format!("{}:{}", app_host, app_port);

        // prepare tls if necessary
        let tls = env::var("ENABLE_TLS")
            .expect("ENABLE_TLS must be set")
            .parse()
            .expect("ENABLE_TLS must be true or false");

        let cert_path;
        let key_path;
        if tls {
            cert_path = Some(env::var("CERT_PATH").expect("CERT_PATH must be set"));
            key_path = Some(env::var("KEY_PATH").expect("KEY_PATH must be set"));
        } else {
            cert_path = None;
            key_path = None;
        }

        // url to connect to the database
        let db_path = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        Config {
            app_addr,
            tls,
            cert_path,
            key_path,
            db_path,
            is_mocking,
        }
    }
}

#[cfg(feature = "mocks")]
pub fn generate_mocking_config() -> Config {
    Config::new(true)
}

pub fn generate_config() -> Config {
    Config::new(false)
}
