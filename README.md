# NYC Dept of Health Covid Dashboard
#### Visualize the covid data the city releases daily

### Resources
 - https://github.com/nychealth/coronavirus-data
 - https://simplabs.com/blog/2020/06/25/writing-rust-nifs-for-elixir-with-rustler/
 - https://blog.discord.com/using-rust-to-scale-elixir-for-11-million-concurrent-users-c6f19fc029d3
 - https://schneider.dev/blog/elixir-phoenix-absinthe-graphql-react-apollo-absurdly-deep-dive/
 - https://diesel.rs/guides/composing-applications/
 - https://dev.to/open-graphql/building-powerful-graphql-servers-with-rust-3gla
 - https://airbnb.io/visx/

### To Run
- start by running `docker-compose up`
- create the following file structure `etl/data/totals/antibody-by-age` in the etl dir to hold your etl data
- Make sure you run the ETL to pull down some data, one that you need to do is the **AntibodyByAge** file
- to do that, exec into the etl container and run `python3 src/covid-data.py`
- this will pull down every version of the AntibodyByAge file the nyc dept of health released on github
- Afterwards you should have a hundred+ rows in your db
- Then run `cargo install diesel_cli` in the db-introspector to get the diesel cli
- afterward run `diesel setup && diesel migration run` to generate your schema.rs file in the src dir
- then run `cargo run` in order to run your graphql server, after everything builds
- if you get any errors about data types, make sure that the schema.rs file matches the struct in the models/antibody_by_age.rs file
- visit http://127.0.0.1:3000 in your browser and pass the following query to the gui

```
{
  antibodyByAge {
    index
    demoVariable
    NUMPEOPPOS
    NUMPEOPTEST
  }
}
```

and you should get back your data

# About

The goal of this project has two parts.

- First is to explore a toolset to take raw data and convert it into a human readable format.
- Second is to bring to light the data that is publicly released by the NYC Dept. of Health every day regarding COVID.

The toolset is as follows:
- PostgresQL (database)
- Rust (language of backend implementation)
- Diesel (ORM and Query Builder)
- Vermillion (DB Model Generator, homemade)
- Juniper (GraphQL server library)
- Javascript (language of frontend implementation)
- React (frontend framework)
- URQL (graphql client)
- Visx (D3 visualization primitives)
