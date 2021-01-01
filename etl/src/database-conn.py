from kedro.extras.datasets.pandas import CSVDataSet
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy import text

engine = create_engine("postgresql+psycopg2://unicorn_user:magical_password@db:5432/rainbow_database")
with engine.connect() as conn:
    result = conn.execute(text("select 'hello world'"))
    print(result.fetchall())

url = './data/data-by-modzcta/2020-05-18T19:22:45Z.csv'
table_name = 'DataByModzcta'

data_set = CSVDataSet(filepath=url)
data = data_set.load()

with engine.connect() as conn:
    data.to_sql(table_name, conn)
