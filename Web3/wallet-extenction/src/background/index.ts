chrome.runtime.onInstalled.addListener(async () => {
  const { hasOnboarded } = await chrome.storage.local.get("hasOnboarded")

  if (!hasOnboarded) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("onboarding.html")
    })
  }
})

