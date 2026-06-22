// Show shorts in format of normal videos
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const urlStr = changeInfo.url;

  if (urlStr && urlStr.includes("youtube.com/shorts/")) {
    const videoId = urlStr.split("/shorts/")[1]?.split(/[?#]/)[0];

    if (videoId) {
      chrome.tabs.update(tabId, {
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }
});
