const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

/**
 * Routes:
 *  GET /jobs
 *    -> return the set of jobs (ex: [5,4,3,2,1])
 *  POST /jobs
 *    -> if job not found in queue
 *        -> add job to queue
 *    -> return the new set of jobs (ex: [6,5,4,3,2])
 *  DELETE /jobs
 *    -> clear the queue
 *  GET /job
 *    -> get the first job of the queue if any
 */
router
  .get("/hello", (ctx) => {
    // Put { hello: "world" } in the body response
    ctx.body = JSON.stringify({ hello: "world" });
  })
  .get("/empty", (ctx) => {
    // I'm an empty route that will return HTTP 204 when called
    ctx.body = null;
  });

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3111);
