"use strict";

// Run with:  npm test
// Covers the pure logic around SerpApi's responses. No network, no credits.

const test = require("node:test");
const assert = require("node:assert/strict");
const { _internals } = require("../src/lib/serpApi");

const { pickBest, reduceFlights, rankHotels, sized, to24h } = _internals;

const leg = (airline, no) => ({
  airline,
  flight_number: no,
  departure_airport: { id: "DEL", name: "Delhi", time: "2026-11-04 07:50" },
  arrival_airport: { id: "KEF", name: "Keflavik", time: "2026-11-05 09:15" },
  duration: 300,
});

const flight = (price, minutes) => ({ price, total_duration: minutes, departure_token: "t" + price, flights: [leg("X", "X1")] });

test("pickBest: a much shorter trip beats a slightly cheaper long one", () => {
  const cheapSlow = { price: 80000, totalDuration: 37 * 60 };
  const dearFast = { price: 83000, totalDuration: 22 * 60 };
  assert.equal(pickBest([cheapSlow, dearFast]), dearFast);
});

test("pickBest: price still wins when the times are close", () => {
  const a = { price: 60000, totalDuration: 20 * 60 };
  const b = { price: 90000, totalDuration: 19 * 60 };
  assert.equal(pickBest([a, b]), a);
});

test("pickBest: empty input gives null", () => {
  assert.equal(pickBest([]), null);
});

test("reduceFlights: keeps the cheapest and the fastest, drops options without a price", () => {
  const many = [];
  for (let i = 0; i < 10; i++) many.push(flight(50000 + i * 1000, 40 * 60 - i * 60)); // dearer = faster
  many.push({ total_duration: 10, flights: [leg("X", "X9")] }); // no price: must be ignored
  const { options } = reduceFlights({ best_flights: many.slice(0, 3), other_flights: many.slice(3) });

  const prices = options.map((o) => o.price);
  assert.ok(prices.includes(50000), "cheapest is kept");
  assert.ok(prices.includes(59000), "fastest is kept");
  assert.ok(options.length <= 9);
  assert.ok(options.every((o) => typeof o.price === "number"));
});

test("reduceFlights: carries Google's price insight through", () => {
  const { insight } = reduceFlights({
    best_flights: [flight(70000, 600)],
    price_insights: { lowest_price: 65000, price_level: "typical", typical_price_range: [60000, 90000] },
  });
  assert.deepEqual(insight, { lowest: 65000, level: "typical", typical: [60000, 90000] });
});

test("reduceFlights: no insight in the response gives null", () => {
  assert.equal(reduceFlights({ best_flights: [flight(70000, 600)] }).insight, null);
});

const hotel = (over) => ({
  name: "H",
  rating: 4,
  reviews: 100,
  locationRating: 4,
  totalCost: 60000,
  facilities: [],
  ...over,
});

test("rankHotels: returns at most three, badged in order", () => {
  const ranked = rankHotels([hotel({ name: "a" }), hotel({ name: "b" }), hotel({ name: "c" }), hotel({ name: "d" })], 70000, null);
  assert.equal(ranked.length, 3);
  assert.deepEqual(
    ranked.map((h) => h.rankBadge),
    ["Best Match", "Best Value", "Highly Rated"],
  );
});

test("rankHotels: a higher rating with more reviews ranks first at equal price", () => {
  const good = hotel({ name: "good", rating: 4.7, reviews: 3000, locationRating: 4.6 });
  const meh = hotel({ name: "meh", rating: 3.4, reviews: 20, locationRating: 3.5 });
  assert.equal(rankHotels([meh, good], 70000, null)[0].name, "good");
});

test("rankHotels: a hotel far over budget is pushed down", () => {
  const fits = hotel({ name: "fits", totalCost: 65000 });
  const dear = hotel({ name: "dear", totalCost: 200000 });
  assert.equal(rankHotels([dear, fits], 70000, null)[0].name, "fits");
});

test("rankHotels: explains why in words", () => {
  const [top] = rankHotels([hotel({ rating: 4.6, reviews: 2000, locationRating: 4.5 })], 70000, null);
  assert.ok(top.rankExplanation.some((w) => /guest rating/.test(w)));
  assert.ok(top.rankExplanation.some((w) => /reviews/.test(w)));
});

test("sized: resizes Google-hosted photos to the requested width", () => {
  assert.equal(sized("https://lh3.googleusercontent.com/p/abc=s10000", 800), "https://lh3.googleusercontent.com/p/abc=w800");
  assert.equal(sized("https://lh3.googleusercontent.com/p/abc", 800), "https://lh3.googleusercontent.com/p/abc=w800");
});

test("sized: leaves unknown hosts and bad input alone", () => {
  assert.equal(sized("https://example.org/a.jpg", 800), "https://example.org/a.jpg");
  assert.equal(sized("not a url", 800), "not a url");
  assert.equal(sized(undefined, 800), undefined);
});

test("to24h: converts 12-hour clock times", () => {
  assert.equal(to24h("3:00 PM"), "15:00");
  assert.equal(to24h("12:30 AM"), "00:30");
  assert.equal(to24h("11:05 AM"), "11:05");
  assert.equal(to24h("whenever", "14:00"), "14:00");
});
