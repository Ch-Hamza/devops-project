const express = require('express');
const router = express.Router();

const prom = require("prom-client");

prom.collectDefaultMetrics({
    labels: { NODE_APP_INSTANCE: 'devops-project' },
});

const totalHttpRequests = new prom.Counter({
    name: 'requests_total',
    help: 'total http requests'
});
prom.register.registerMetric(totalHttpRequests);

const totalTasksInQueue = new prom.Counter({
    name: 'total_tasks',
    help: 'total tasks in queue'
});
prom.register.registerMetric(totalTasksInQueue);

const durationHist = new prom.Histogram({
    name: 'requests_duration',
    help: 'duration histogram of http responses',
    buckets: [0.003, 0.03, 0.1, 0.3, 1.5, 10],
});
prom.register.registerMetric(durationHist);

const healthCheck = new prom.Gauge({
    name: 'up',
    help: '1 = up, 0 = not up',
});
prom.register.registerMetric(healthCheck);

router.get('/metrics', async (_req, res) => {
    res.set('Content-Type', prom.register.contentType);
    res.end(await prom.register.metrics());
});

module.exports = router;
