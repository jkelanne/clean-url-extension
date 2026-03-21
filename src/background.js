importScripts("cleaner.js");

const OFFSCREEN_DOCUMENT_PATH = "src/offscreen.html";

async function ensureOffscreenDocument() {
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl]
  });

  if (contexts.length === 0) {
    await chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: ["CLIPBOARD"],
      justification: "Copy cleaned URL to clipboard"
    });
  }
}

async function copyToClipboard(text) {
  await ensureOffscreenDocument();

  const response = await chrome.runtime.sendMessage({
    type: "copy-to-clipboard",
    text
  });

  if (!response?.ok) {
    throw new Error(response?.error || "Clipboard write failed");
  }
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy-clean-url") {
    console.log("copy-clean-url command triggered");

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const originalUrl = tabs[0]?.url;

    if (!originalUrl) {
      return;
    }

    const cleanedUrl = cleanUrl(originalUrl);

    console.log("Original URL:", originalUrl);
    console.log("Cleaned URL:", cleanedUrl);

    try {
      await copyToClipboard(cleanedUrl);
      console.log("Clipboard copy succeeded");
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  }
});
