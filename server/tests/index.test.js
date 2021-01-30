const fetch = require("node-fetch");

const localURL = `${process.env.API_URL || "http://localhost:8000"}`;
const jobsURL = `${localURL}/jobs`;
const jobURL = `${localURL}/job`;

beforeEach(async () => {
  await fetch(jobsURL, {
    method: "delete",
  }).then((res) => res.text());
});

describe("Corner cases test suite", () => {

  it("should handle multiple insertions", async () => {
    const insert1 = await fetch(jobsURL, {
      method: "post",
      body: JSON.stringify({ input: 1 }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    expect(insert1).toEqual([1]);

    const insert2 = await fetch(jobsURL, {
      method: "post",
      body: JSON.stringify({ input: 2 }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    expect(insert2).toEqual([2, 1]);

    const insert3 = await fetch(jobsURL, {
      method: "post",
      body: JSON.stringify({ input: 3 }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    // Same insert twice
    const insert4 = await fetch(jobsURL, {
      method: "post",
      body: JSON.stringify({ input: 3 }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    expect(insert4).toEqual([3, 2, 1]);

    const getJobs = await fetch(jobsURL).then((res) => res.json());

    expect(getJobs).toEqual([3, 2, 1]);
  });

  it("should handle pop", async () => {
    const queue = [1, 2, 6, 4, 5, 1, 3];

    await Promise.all(
      queue.map((input) => {
        return fetch(jobsURL, {
          method: "post",
          body: JSON.stringify({ input }),
          headers: { "Content-Type": "application/json" },
        });
      })
    );

    expect(await fetch(jobsURL).then((res) => res.json())).toEqual([
      3,
      5,
      4,
      6,
      2,
      1,
    ]);

    expect(await fetch(jobURL).then((r) => r.json())).toEqual(1);
    expect(await fetch(jobURL).then((r) => r.json())).toEqual(2);

    expect(await fetch(jobsURL).then((r) => r.json())).toEqual([3, 5, 4, 6]);

    const expectedRes = [15, 3, 5, 4, 6];

    expect(
      await fetch(jobsURL, {
        method: "post",
        body: JSON.stringify({ input: 15 }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
    ).toEqual(expectedRes);

    for (let index = 0; index < 5; index++) {
      expect(await fetch(jobURL).then((r) => r.json())).toEqual(
        expectedRes[expectedRes.length - 1 - index]
      );
    }

    expect(await fetch(jobURL).then((r) => r.status)).toBe(204);

    expect(await fetch(jobsURL).then((r) => r.json())).toEqual([]);
  });
});
