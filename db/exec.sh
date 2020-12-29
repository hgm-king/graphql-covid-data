source /db/database.env
export PGPASSWORD=$POSTGRES_PASSWORD
psql --host=database --username=$POSTGRES_USER --dbname=$POSTGRES_DB
