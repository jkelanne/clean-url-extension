const exactMatchRemovableParams = new Set(["fbclid", "gclid"]);
const prefixRemovableParams = ["utm_"];

function shouldRemoveParam(paramName) {
  if (exactMatchRemovableParams.has(paramName)) {
    return true;
  }

  return prefixRemovableParams.some((prefix) => paramName.startsWith(prefix));
}
