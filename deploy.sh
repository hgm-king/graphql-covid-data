echo "yes" | ssh root@covid-data.nyc

docker-compose down
echo "y" | docker container prune
docker image rm hgmaxwellking/covid-data-dashboard-etl hgmaxwellking/covid-data-dashboard-frontend hgmaxwellking/covid-data-dashboard-server
docker-compose up --force-recreate --build -d
