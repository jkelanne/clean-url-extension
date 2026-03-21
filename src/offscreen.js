chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "copy-to-clipboard") {
    return undefined;
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = message.text;
    document.body.appendChild(textarea);
    textarea.select();

    const ok = document.execCommand("copy");

    document.body.removeChild(textarea);

    if (ok) {
      sendResponse({ ok: true });
    } else {
      sendResponse({ ok: false, error: "Clipboard write failed" });
    }
  } catch (error) {
    sendResponse({ ok: false, error: String(error) });
  }

  return undefined;
});
