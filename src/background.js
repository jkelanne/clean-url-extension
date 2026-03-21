chrome.commands.onCommand.addListener((command) => {
  if (command === "copy-clean-url") {
    console.log("copy-clean-url command triggered");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs[0]?.url);
    });
  }
});
