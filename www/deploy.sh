echo "deploying the client to dockerhub!"

docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD
docker image build -t $DOCKER_HUB_USERNAME/covid-data-dashboard-frontend .
