const exactMatchRemovableParams = new Set(["fbclid", "gclid", "dclid", "igshid"]);
const prefixRemovableParams = ["utm_", "mc_"];

function shouldRemoveParam(paramName) {
  if (exactMatchRemovableParams.has(paramName)) {
    return true;
  }

  return prefixRemovableParams.some((prefix) => paramName.startsWith(prefix));
}

if (typeof globalThis !== "undefined") {
  globalThis.shouldRemoveParam = shouldRemoveParam;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { shouldRemoveParam };
}
