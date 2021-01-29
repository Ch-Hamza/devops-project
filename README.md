## App documentation

We want to develop an API in charge of managing a cipher queue (which we will call job).
This API exposes several routes:

- GET / jobs: returns the array of jobs (ex: [5,4,3,2,1])
- POST / jobs: accepts a JSON in the format `{" input ": number}` and adds the number in the queue **if it is not already present inside the queue** (ex: ` {"input": 12} `)
- GET / job: returns the first job in the queue (and updates the queue) (ex: 12)
- DELETE / jobs: empty the queue if the queue is empty, we return an HTTP 204 status and no output
## Requirements
A compute node containing
* Docker 
* Docker-compose
## Running the solution
Use this command to run the solution
```bash
sudo docker stack deploy --compose-file docker-compose.yml devops
```
After running the container you can check these ports:

|||
|----|---|
|8000|Node application|
|9090|Prometheus|
|3000|Graphana|
## Architechture

## Deployment strategy
We used rolling update strategy for this project with a delay of 10s between replicas.

## CI/CD
### CI
* Install dependencies
* Run tests on multiple versions of NodeJs
### CD
* Login to docker hub
* Build image
* Push image

To run the CD workflow, make sure to configure the following secrets
* DOCKER_REPO
* DOCKER_USER
* DOCKER_PASS
