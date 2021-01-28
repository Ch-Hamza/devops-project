const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
app.use(bodyParser.json())

const app_routes = require('./routes/app_routes');
router.use(app_routes);

const prom_routes = require('./routes/prom_middleware');
router.use(prom_routes);

app.use(router);
app.listen(8000);
