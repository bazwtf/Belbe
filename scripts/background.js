// Background script that listens to messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message from content script:", message);
    // Handle the received message
    // For example, save it or perform another task
  });