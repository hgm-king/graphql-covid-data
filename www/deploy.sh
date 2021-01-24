echo "deploying the client to dockerhub!"

echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
docker image build -t $DOCKER_HUB_USERNAME/covid-data-dashboard-frontend .
docker push $DOCKER_HUB_USERNAME/covid-data-dashboard-frontend
