let shouldRemoveParamFn = globalThis.shouldRemoveParam;

if (typeof module !== "undefined" && module.exports) {
  ({ shouldRemoveParam: shouldRemoveParamFn } = require("./rules.js"));
} else if (typeof importScripts === "function") {
  importScripts("rules.js");
  shouldRemoveParamFn = globalThis.shouldRemoveParam;
}

function cleanUrl(url) {
  const parsedUrl = new URL(url);

  for (const key of [...parsedUrl.searchParams.keys()]) {
    if (shouldRemoveParamFn(key)) {
      parsedUrl.searchParams.delete(key);
    }
  }

  return parsedUrl.toString();
}

if (typeof globalThis !== "undefined") {
  globalThis.cleanUrl = cleanUrl;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { cleanUrl };
}
