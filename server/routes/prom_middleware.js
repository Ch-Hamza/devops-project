const express = require('express');
const router = express.Router();

const prom = require("prom-client");

prom.collectDefaultMetrics({
    labels: { NODE_APP_INSTANCE: 'devops-project' },
});

const totalHttpRequests = new prom.Counter({
    name: 'custom_requests_total',
    help: 'total http requests'
});
prom.register.registerMetric(totalHttpRequests);

const totalJobsInQueue = new prom.Counter({
    name: 'custom_total_tasks',
    help: 'total tasks in queue'
});
prom.register.registerMetric(totalJobsInQueue);

const durationHist = new prom.Histogram({
    name: 'custom_requests_duration',
    help: 'duration histogram of http responses',
    buckets: [0.003, 0.03, 0.1, 0.3, 1.5, 10],
});
prom.register.registerMetric(durationHist);

router.get('/metrics', async (_req, res) => {
    res.set('Content-Type', prom.register.contentType);
    res.end(await prom.register.metrics());
});



function increaseTotalHttpRequests(){
    totalHttpRequests.inc();
}

function increaseJobsInQueue(){
    totalJobsInQueue.inc();
}

function decreaseJobsInQueue(){
    totalJobsInQueue.dec();
}

function clearQueue(){
    totalJobsInQueue.reset();
}

module.exports = {router, increaseJobsInQueue, decreaseJobsInQueue, clearQueue, increaseTotalHttpRequests};
