# Resources
 - https://github.com/nychealth/coronavirus-data
 - https://simplabs.com/blog/2020/06/25/writing-rust-nifs-for-elixir-with-rustler/
 - https://blog.discord.com/using-rust-to-scale-elixir-for-11-million-concurrent-users-c6f19fc029d3
 - https://schneider.dev/blog/elixir-phoenix-absinthe-graphql-react-apollo-absurdly-deep-dive/
 - https://diesel.rs/guides/composing-applications/

### To Run
- start by running `docker-compose up`
- Make sure you run the ETL to pull down some data, one that you need to do is the **AntibodyByAge** file
- to do that, exec into the etl container and run `python3 src/covid-data.py`
- this will pull down every version of the AntibodyByAge file the nyc dept of health released on github
- Afterwards you should have a hundred+ rows in your db
- Then run `cargo install diesel_cli` in the db-introspector to get the diesel cli
- afterward run `diesel setup` to generate your schema.rs file in the src dir
- then run `cargo run` in order to run your graphql server, after everything builds
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
