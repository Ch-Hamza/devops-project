const express = require('express');
const router = express.Router();

const prom = require("prom-client");
const register = new prom.Registry();

prom.collectDefaultMetrics({
    register
});

// const totalJobsInQueue = new prom.Counter({
//     name: 'custom_total_jobs',
//     help: 'total jobs in queue'
// });
// register.registerMetric(totalJobsInQueue);
//
// const durationHist = new prom.Histogram({
//     name: 'custom_requests_duration',
//     help: 'duration histogram of http responses',
//     buckets: [0.003, 0.03, 0.1, 0.3, 1.5, 10],
// });
// register.registerMetric(durationHist);
//
// router.get('/metrics', async (_req, res) => {
//     res.set('Content-Type', prom.register.contentType);
//     res.end(await register.metrics());
// });
//
//
//
//
// function increaseJobsInQueue(){
//     totalJobsInQueue.inc();
// }
//
// function decreaseJobsInQueue(){
//     totalJobsInQueue.dec();
// }
//
// function clearQueue(){
//     totalJobsInQueue.reset();
// }
//
// module.exports = {router, increaseJobsInQueue, decreaseJobsInQueue, clearQueue, increaseTotalHttpRequests};
module.exports = {router};
