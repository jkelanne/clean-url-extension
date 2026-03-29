const test = require("node:test");
const assert = require("node:assert/strict");

const { cleanUrl } = require("../src/cleaner.js");

test("URL with no query params remains unchanged", () => {
  const input = "https://example.com/path";
  assert.equal(cleanUrl(input), input);
});

test("removes utm_* params", () => {
  const input = "https://example.com/page?utm_source=newsletter&utm_medium=email";
  const expected = "https://example.com/page";
  assert.equal(cleanUrl(input), expected);
});

test("removes mc_* params", () => {
  const input = "https://example.com/page?mc_cid=abc123&mc_eid=def456&ref=ok";
  const expected = "https://example.com/page?ref=ok";
  assert.equal(cleanUrl(input), expected);
});

test("removes only tracking params from mixed query", () => {
  const input = "https://example.com/page?utm_source=x&ref=abc&id=123&utm_campaign=spring";
  const expected = "https://example.com/page?ref=abc&id=123";
  assert.equal(cleanUrl(input), expected);
});

test("removes fbclid param", () => {
  const input = "https://example.com/page?fbclid=abc123&ref=ok";
  const expected = "https://example.com/page?ref=ok";
  assert.equal(cleanUrl(input), expected);
});

test("removes gclid param", () => {
  const input = "https://example.com/page?gclid=xyz789&ref=ok";
  const expected = "https://example.com/page?ref=ok";
  assert.equal(cleanUrl(input), expected);
});

test("removes dclid param", () => {
  const input = "https://example.com/page?dclid=xyz789&ref=ok";
  const expected = "https://example.com/page?ref=ok";
  assert.equal(cleanUrl(input), expected);
});

test("removes igshid param", () => {
  const input = "https://example.com/page?igshid=abc123&ref=ok";
  const expected = "https://example.com/page?ref=ok";
  assert.equal(cleanUrl(input), expected);
});

test("removes si param on youtube.com", () => {
  const input = "https://youtube.com/watch?v=abc123&si=sharetoken";
  const expected = "https://youtube.com/watch?v=abc123";
  assert.equal(cleanUrl(input), expected);
});

test("removes si param on www.youtube.com", () => {
  const input = "https://www.youtube.com/watch?v=abc123&si=sharetoken";
  const expected = "https://www.youtube.com/watch?v=abc123";
  assert.equal(cleanUrl(input), expected);
});

test("removes si param on youtu.be", () => {
  const input = "https://youtu.be/abc123?si=sharetoken";
  const expected = "https://youtu.be/abc123";
  assert.equal(cleanUrl(input), expected);
});

test("does not remove si param on non-youtube domains", () => {
  const input = "https://example.com/page?si=keepme&ref=ok";
  const expected = "https://example.com/page?si=keepme&ref=ok";
  assert.equal(cleanUrl(input), expected);
});

test("preserves hash fragment", () => {
  const input = "https://example.com/page?utm_source=x&ref=ok#section-2";
  const expected = "https://example.com/page?ref=ok#section-2";
  assert.equal(cleanUrl(input), expected);
});
