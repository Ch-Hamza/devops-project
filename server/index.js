const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
app.use(bodyParser.json())

const app_routes = require('./routes/app_routes');
router.use(app_routes.router);

const prom_routes = require('./routes/prom_middleware');
router.use(prom_routes.router);

// router.use((req, res, next) => {
//     next();
// });

app.use(router);
app.listen(8000);
