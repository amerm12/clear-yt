const switchButton = document.querySelector('input[type="checkbox"]');

// Reads the value from browser storage
chrome.storage.sync.get("enabled", (data) => {
  switchButton.checked = data.enabled !== false;
});

// Event listener for switch button
switchButton.addEventListener("change", () => {
  // Prompt the user before reloading the page
  const confirmMessage = switchButton.checked
    ? "This will reload all open YouTube tabs to enable the extension. Continue?"
    : "This will reload all open YouTube tabs to disable the extension. Continue?";
  if (!window.confirm(confirmMessage)) {
    switchButton.checked = !switchButton.checked;
    return;
  }

  // Save new value to the browser storage
  chrome.storage.sync.set({ enabled: switchButton.checked });

  // Reload all open YouTube tabs
  chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.reload(tab.id);
    }
  });
});
