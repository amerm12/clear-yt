// Show shorts in format of normal videos
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const urlString = changeInfo.url;

  // Check if URL leads to the Shorts page
  if (urlString && urlString.includes("youtube.com/shorts/")) {
    const videoId = urlString.split("/shorts/")[1]?.split(/[?#]/)[0];

    // Change the URL to open YouTube Short in standard video format
    if (videoId) {
      chrome.tabs.update(tabId, {
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }
});
