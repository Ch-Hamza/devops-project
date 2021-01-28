const express = require('express');
const router = express.Router();

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
    .get("/jobs", (req, res) => {
        res.send(JSON.stringify(jobs));
    })

    .post("/jobs", (req, res) => {
        const input = req.body.input;
        if (!Number.isInteger(input)) {
            res.status(400);
        } else if (!jobs.includes(input)) {
            jobs.unshift(input);
        }
        res.send(jobs);
    })

    .delete("/jobs", (req, res) => {
        jobs = [];
        res.status(204).send(null);
    })

    .get("/job", (req, res) => {
        if(jobs.length !== 0) {
            res.send(JSON.stringify(jobs.pop()));
        } else {
            res.status(204).send(null);
        }
    })
    .get("/hello", (req, res) => {
        // Put { hello: "world" } in the body response
        res.send(JSON.stringify({ hello: "world" }));
    });

module.exports = router;
