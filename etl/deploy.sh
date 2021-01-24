echo "deploying the etl to dockerhub!"

echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
docker image build -t $DOCKER_HUB_USERNAME/covid-data-dashboard-etl .
docker push $DOCKER_HUB_USERNAME/covid-data-dashboard-etl
