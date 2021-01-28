# App documentation

We want to develop an API in charge of managing a cipher queue (which we will call job).
This API exposes several routes:

- GET / jobs: returns the array of jobs (ex: [5,4,3,2,1])
- POST / jobs: accepts a JSON in the format `{" input ": number}` and adds the number in the queue **if it is not already present inside the queue** (ex: ` {"input": 12} `)
- GET / job: returns the first job in the queue (and updates the queue) (ex: 12)
- DELETE / jobs: empty the queue if the queue is empty, we return an HTTP 204 status and no output
