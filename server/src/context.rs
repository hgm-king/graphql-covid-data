use diesel::pg::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};

pub struct Context {
    // Use your real database pool here.
    pool: Pool<ConnectionManager<PgConnection>>,
}

impl Context {
    pub fn new(conn_string: &str) -> Self {
        let manager = ConnectionManager::<PgConnection>::new(conn_string);
        let pool = Pool::new(manager).unwrap();

        Context { pool }
    }

    pub fn get_conn(&self) -> PooledConnection<ConnectionManager<PgConnection>> {
        self.pool.get().unwrap()
    }
}

impl juniper::Context for Context {}
