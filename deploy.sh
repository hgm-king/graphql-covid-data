ssh root@104.131.165.152

docker image rm  hgmaxwellking/covid-data-dashboard-etl hgmaxwellking/covid-data-dashboard-frontend
docker-compose up --force-recreate --build
