ssh root@104.131.165.152

docker image rm hgmaxwellking/covid-data-dashboard-etl hgmaxwellking/covid-data-dashboard-frontend hgmaxwellking/covid-data-dashboard-server
docker-compose up --force-recreate --build
