const exactMatchRemovableParams = new Set(["fbclid", "gclid", "dclid", "igshid"]);
const prefixRemovableParams = ["utm_", "mc_"];
const domainSpecificRemovableParams = {
  "youtube.com": new Set(["si"]),
  "www.youtube.com": new Set(["si"]),
  "youtu.be": new Set(["si"]),
};

function shouldRemoveParam(paramName, hostname) {
  if (exactMatchRemovableParams.has(paramName)) {
    return true;
  }

  if (prefixRemovableParams.some((prefix) => paramName.startsWith(prefix))) {
    return true;
  }

  return domainSpecificRemovableParams[hostname]?.has(paramName) ?? false;
}

if (typeof globalThis !== "undefined") {
  globalThis.shouldRemoveParam = shouldRemoveParam;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { shouldRemoveParam };
}
