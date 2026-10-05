"use strict";

// The cache and the credit caps. Disk store always; MongoDB store only when
// TEST_MONGODB_URI points at a database the test may write to.
//
//   TEST_MONGODB_URI=mongodb://127.0.0.1:27017/serp_test npm test

const test = require("node:test");
const assert = require("node:assert/strict");
const os = require("os");
const path = require("path");

process.env.SERP_CACHE_FILE = path.join(os.tmpdir(), "serp-test-" + process.pid + ".json");
process.env.SERPAPI_DAILY_CAP = "3";
process.env.SERPAPI_MONTHLY_CAP = "5";

const { _internals } = require("../src/lib/serpApi");
const { diskStore, mongoStore } = _internals;

test("disk store: credits run out at the daily cap", async () => {
  assert.equal(await diskStore.spend(), true);
  assert.equal(await diskStore.spend(), true);
  assert.equal(await diskStore.spend(), true);
  assert.equal(await diskStore.spend(), false);
  assert.equal((await diskStore.usage()).today, 3);
});

test("disk store: put then get", async () => {
  await diskStore.put("k", { at: 1, data: { a: 1 } });
  assert.deepEqual((await diskStore.get("k")).data, { a: 1 });
  assert.equal(await diskStore.get("missing"), null);
});

const URI = process.env.TEST_MONGODB_URI;

test("mongodb store: shared caps, atomic and never over the limit", { skip: !URI && "set TEST_MONGODB_URI to run" }, async () => {
  const mongoose = require("mongoose");
  await mongoose.connect(URI);
  try {
    await mongoose.connection.dropDatabase();
    // Ten instances ask at once for a budget of three: exactly three get one.
    const results = await Promise.all(Array.from({ length: 10 }, () => mongoStore.spend()));
    assert.equal(results.filter(Boolean).length, 3);
    const u = await mongoStore.usage();
    assert.equal(u.today, 3);
    assert.equal(u.month, 3);

    await mongoStore.put("k", { at: Date.now(), data: { hello: "world" } });
    const hit = await mongoStore.get("k");
    assert.deepEqual(hit.data, { hello: "world" });
    assert.equal(await mongoStore.get("nope"), null);
  } finally {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
});
