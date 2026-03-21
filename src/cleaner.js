importScripts("rules.js");

function cleanUrl(url) {
  const parsedUrl = new URL(url);

  for (const key of [...parsedUrl.searchParams.keys()]) {
    if (shouldRemoveParam(key)) {
      parsedUrl.searchParams.delete(key);
    }
  }

  return parsedUrl.toString();
}
