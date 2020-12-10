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
let jobs = [];
router
  .get("/jobs", (ctx) => {
    ctx.body = JSON.stringify(jobs);
  })

  .post("/jobs", (ctx) => {
    const input = ctx.request.body.input;
    if (!Number.isInteger(input)) {
      ctx.status = 400;
    } else if (!jobs.includes(input)) {
        jobs.unshift(input);
    }
    ctx.body = JSON.stringify(jobs);
  })
  
  .delete("/jobs", (ctx) => {
    jobs = [];
    ctx.status = 204;
    ctx.body = null;
  })
  
  .get("/job", (ctx) => {
    if(jobs.length != 0) {
      ctx.body = JSON.stringify(jobs.pop());
    } else {
      ctx.status = 204;
      ctx.body = null;
    }
  })
  .get("/hello", (ctx) => {
    // Put { hello: "world" } in the body response
    ctx.body = JSON.stringify({ hello: "world" });
  });

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3111);
