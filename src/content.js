function hideShorts() {
  // Hide shorts from Start Page
  const shortsMainPage = document.getElementsByTagName(
    "ytd-rich-section-renderer",
  );
  for (let element of shortsMainPage) {
    element.style.display = "none";
  }

  // Hide shorts button from navbar
  const shortsNavButton = document.querySelector(
    'ytd-guide-entry-renderer:has(a[title="Shorts"])',
  );
  if (shortsNavButton) {
    shortsNavButton.style.display = "none";
  }

  // Hide shorts button from minimized navbar
  const shortsNavButtonMin = document.querySelector(
    'ytd-mini-guide-entry-renderer:has(a[title="Shorts"])',
  );
  if (shortsNavButtonMin){
    shortsNavButtonMin.style.display = "none";
  }

  // Hide shorts button from channel
  const shortsChannelButton = document.querySelector(
    'yt-tab-shape[tab-title="Shorts"]',
  );
  if (shortsChannelButton) {
    shortsChannelButton.style.display = "none";
  }

  // Hide shorts from search
  const shortsSearch = document.getElementsByTagName("grid-shelf-view-model");
  for (let element of shortsSearch) {
    element.style.display = "none";
  }

  // Hide shorts button from search
  const buttonsSeach = document.querySelectorAll(".ytChipShapeChip");
  const shortsButtonSearch = Array.from(buttonsSeach).find(
    (el) => el.textContent.trim() === "Shorts",
  );
  if (shortsButtonSearch) {
    shortsButtonSearch.style.display = "none";
  }

  // Hide shorts section from in-video recommendations
  const videoShortsSection = document.getElementsByTagName("ytd-reel-shelf-renderer");
  for (let element of videoShortsSection) {
    element.style.display = "none"; 
  }
}

hideShorts();

/* new MutationObserver(hideShorts).observe(
  document.body || document.documentElement,
  {
    childList: true,
    subtree: true,
  },
);
 */

/* new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      hideShorts();
      break;
    }
  }
}).observe(
  document.body || document.documentElement,
  {
    childList: true,
    subtree: true,
  },
); */


let scheduled = false;

new MutationObserver((mutations) => {
  if (scheduled) return;

  for (let mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      scheduled = true;

      requestAnimationFrame(() => {
        hideShorts();
        scheduled = false;
      });

      break;
    }
  }
}).observe(
  document.body || document.documentElement,
  { childList: true, subtree: true }
);