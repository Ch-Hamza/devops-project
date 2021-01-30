const express = require('express');
const router = express.Router();
const { increaseJobsInQueue, increaseCompletedJobsInQueue, clearQueue, decreaseJobsInQueue, durationHist, increaseDeletedJobs } = require('./prom_middleware');
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
            increaseJobsInQueue();
            jobs.unshift(input);
        }
        res.send(jobs);
    })

    .delete("/jobs", (req, res) => {
        increaseDeletedJobs(jobs.length);
        jobs = [];
        clearQueue();
        res.status(204).send(null);
    })

    .get("/job", (req, res) => {
        if(jobs.length !== 0) {
            const timer = durationHist.startTimer();
            const job = getJob(jobs);
            setTimeout(() => {}, Math.floor(Math.random() * 1000));
            timer();
            res.send(JSON.stringify(job));
        } else {
            res.status(204).send(null);
        }
    })
    .get("/", (req, res) => {
        res.send(JSON.stringify({ hello: "world" }));
    });

function getJob(jobs_arr) {
    if(Array.isArray(jobs_arr)) {
        increaseCompletedJobsInQueue();
        decreaseJobsInQueue();
        return jobs_arr.pop();
    } else {
        throw new TypeError('wrong type!');
    }
}

module.exports = {router, getJob};
