const fetch = require("node-fetch");

const localURL = `${process.env.API_URL || "http://localhost:3111"}`;
const jobsURL = `${localURL}/jobs`;
const jobURL = `${localURL}/job`;
  
describe("Job API tests", () => {
    
    it("get list of jobs", async () => {
        const response = await fetch(jobsURL, {
            method: "get",
        }).then((res) => res.json());
        
        expect(Array.isArray(response)).toBe(true);
        expect(response).toEqual([]);
    });
    
    it("get next job", async () => {
        const response = await fetch(jobURL, {
            method: "get",
        }).then((res) => res.status);
        
        expect(response).toBe(204);
    });
    
    it("delete jobs", async () => {
        const response = await fetch(jobsURL, {
            method: "delete",
        }).then((res) => ({result: res.text(), status: res.status}));
        
        expect(response.result).toMatchObject({});
        expect(response.status).toBe(204);
    });
    
    it("insert job", async () => {
        const response = await fetch(jobsURL, {
            method: "post",
            body: JSON.stringify({ input: 1 }),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
        
        expect(Array.isArray(response)).toBe(true);
        expect(response).toEqual([1]);
    });
    
    it("insertion should not accept strings", async () => {
        const response = await fetch(jobsURL, {
            method: "post",
            body: JSON.stringify({ input: "not a number" }),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.status);
        
        expect(response).toBe(400);
    });
});
