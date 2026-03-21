importScripts("cleaner.js");

chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-clean-url") {
    console.log("copy-clean-url command triggered");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const originalUrl = tabs[0]?.url;

      if (!originalUrl) {
        return;
      }

      const cleanedUrl = cleanUrl(originalUrl);

      console.log("Original URL:", originalUrl);
      console.log("Cleaned URL:", cleanedUrl);
    });
  }
});
