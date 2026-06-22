const SELECTORS = [
  "ytd-rich-section-renderer", // Shorts section on start page
  'ytd-guide-entry-renderer:has(a[title="Shorts"])', // Shorts button in left side navbar
  'ytd-mini-guide-entry-renderer:has(a[title="Shorts"])', // Shorts button in left side navbar (minimized)
  'yt-tab-shape[tab-title="Shorts"]', // Shorts button on channel page
  "grid-shelf-view-model", // Shorts section in search results
  "ytd-reel-shelf-renderer", // Shorts section in in-video recommendations
];

function hideShorts() {
  // Loop through selectors and hide every element if not already hidden
  for (let selector of SELECTORS) {
    for (let element of document.querySelectorAll(selector)) {
      if (element.style.display !== "none") {
        element.style.display = "none";
      }
    }
  }

  // Hide shorts button from search
  for (let element of document.querySelectorAll(".ytChipShapeChip")) {
    if (
      element.textContent.trim() === "Shorts" &&
      element.style.display !== "none"
    ) {
      element.style.display = "none";
    }
  }

  let debounceTimer = null;
}

hideShorts();

// Read the value from browser storage and check if extension is enabled
chrome.storage.sync.get("enabled", (data) => {
  if (data.enabled === false) return;

  hideShorts();

  let debounceTimer = null;

  // Callback function when DOM changes occur
  new MutationObserver((mutations) => {
    // Check if there are changes to DOM, if no just return
    const hasAddedNodes = mutations.some(
      (mutation) => mutation.addedNodes.length > 0,
    );
    if (!hasAddedNodes) return;

    // Set the timer to call hideShorts after 100ms
    // If there is another DOM change in the meantime, timer will be canceled with clearTimeout()
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(hideShorts, 100);
  }).observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
});
