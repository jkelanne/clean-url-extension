function cleanUrl(url) {
  const parsedUrl = new URL(url);

  for (const key of [...parsedUrl.searchParams.keys()]) {
    if (key.startsWith("utm_") || key === "fbclid" || key === "gclid") {
      parsedUrl.searchParams.delete(key);
    }
  }

  return parsedUrl.toString();
}
