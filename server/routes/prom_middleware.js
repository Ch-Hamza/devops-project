const express = require('express');
const router = express.Router();

const prom = require("prom-client");
const register = new prom.Registry();

prom.collectDefaultMetrics({
    register
});

router.get('/metrics', async (_req, res) => {
    res.set('Content-Type', prom.register.contentType);
    res.end(await register.metrics());
});

const totalJobsInQueue = new prom.Gauge({
    name: 'custom_total_jobs',
    help: 'total jobs in queue'
});
register.registerMetric(totalJobsInQueue);

const completedJobsInQueue = new prom.Counter({
    name: 'custom_completed_jobs',
    help: 'completed jobs'
});
register.registerMetric(completedJobsInQueue);

const deletedJobs = new prom.Counter({
    name: 'custom_deleted_jobs',
    help: 'deleted jobs'
});
register.registerMetric(deletedJobs);

const durationHist = new prom.Histogram({
    name: 'custom_jobs_duration',
    help: 'duration histogram of jobs',
    buckets: [0.005, 0.010, 0.025, 0.500, 0.750, 1, 1.25],
});
register.registerMetric(durationHist);

function increaseJobsInQueue(){
    totalJobsInQueue.inc();
}

function decreaseJobsInQueue(){
    totalJobsInQueue.dec();
}

function increaseCompletedJobsInQueue(){
    completedJobsInQueue.inc();
}

function clearQueue(){
    totalJobsInQueue.reset();
}

function increaseDeletedJobs(length) {
    deletedJobs.inc(length)
}

module.exports = {router, increaseJobsInQueue, decreaseJobsInQueue, increaseCompletedJobsInQueue, clearQueue, durationHist, increaseDeletedJobs};
