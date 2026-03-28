importScripts("cleaner.js");

const OFFSCREEN_DOCUMENT_PATH = "src/offscreen.html";
const COPY_CLEAN_URL_MENU_ID = "copy-clean-url";
const COPY_NOTIFICATION_ID = "clean-url-copy-status";
const NOTIFICATION_ICON_PATH = "src/icons/notification-128.png";

function createContextMenu() {
  chrome.contextMenus.create(
    {
      id: COPY_CLEAN_URL_MENU_ID,
      title: "Copy Clean URL",
      contexts: ["page", "link"]
    },
    () => {
      if (
        chrome.runtime.lastError &&
        !chrome.runtime.lastError.message.includes("duplicate id")
      ) {
        console.error("Context menu creation failed", chrome.runtime.lastError);
      }
    }
  );
}

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

async function showCopyNotification(message) {
  try {
    await chrome.notifications.create(COPY_NOTIFICATION_ID, {
      type: "basic",
      iconUrl: chrome.runtime.getURL(NOTIFICATION_ICON_PATH),
      title: "Clean URL Copier",
      requireInteraction: false,
      message
    });
  } catch (error) {
    console.error("Notification failed", error);
  }
}

async function copyCleanUrl(originalUrl) {
  if (!originalUrl) {
    return;
  }

  const cleanedUrl = cleanUrl(originalUrl);

  console.log("Original URL:", originalUrl);
  console.log("Cleaned URL:", cleanedUrl);

  try {
    await copyToClipboard(cleanedUrl);
    console.log("Clipboard copy succeeded");
    await showCopyNotification("Clean URL copied");
  } catch (error) {
    console.error("Clipboard copy failed", error);
    await showCopyNotification("Failed to copy clean URL");
  }
}

async function copyCleanUrlFromActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  await copyCleanUrl(tabs[0]?.url);
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenu();
});

chrome.runtime.onStartup.addListener(() => {
  createContextMenu();
});

createContextMenu();

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === COPY_CLEAN_URL_MENU_ID) {
    if (info.linkUrl) {
      await copyCleanUrl(info.linkUrl);
    } else {
      await copyCleanUrlFromActiveTab();
    }
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy-clean-url") {
    console.log("copy-clean-url command triggered");
    await copyCleanUrlFromActiveTab();
  }
});
