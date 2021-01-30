const { getJob } = require('../routes/app_routes');

describe("Unit test suite", () => {

    it("should be null if jobs is empty", () => {
        const job = getJob([]);
        expect(job).toBeUndefined();
    });

    it("should return last value of array", () => {
        const job = getJob([1, 2]);
        expect(job).toBe(2);
    });

    it("should throw error if parameter is not an array", () => {
        const jobFunction = () => getJob('test');
        expect(jobFunction).toThrowError(new TypeError('wrong type!'));
    });

});
