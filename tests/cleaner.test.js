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

test("preserves hash fragment", () => {
  const input = "https://example.com/page?utm_source=x&ref=ok#section-2";
  const expected = "https://example.com/page?ref=ok#section-2";
  assert.equal(cleanUrl(input), expected);
});
