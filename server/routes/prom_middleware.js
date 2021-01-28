const express = require('express');
const router = express.Router();

const prom = require("prom-client");

prom.collectDefaultMetrics({
    labels: { NODE_APP_INSTANCE: 'devops-project' },
});

router.get('/metrics', async (_req, res) => {
    res.set('Content-Type', prom.register.contentType);
    res.end(await prom.register.metrics());
});

module.exports = router;
