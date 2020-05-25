var listURL = new Array();
var listTimestamp = new Array();
var username;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var d = new Date();
  var url;

  chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
    url = tabs[0].url;
  });

  chrome.storage.sync.get('url', function (result) {
    if (result.url != null) {
      listURL = result.url;
      listURL.push(url);
    }
  });

  chrome.storage.sync.set({ 'url': listURL }, function () { });

  chrome.storage.sync.get('time', function (result) {
    if (result.time != null) {
      listTimestamp = result.time;
      listTimestamp.push(d.toLocaleTimeString());
    }
  });
  chrome.storage.sync.set({ 'time': listTimestamp }, function () { });

});




/* Upon receiving the 'download' message from popup.js, get items from storage, format, and download the file */
chrome.runtime.onMessage.addListener(
  function (arg, sender) {
    if (arg.message === 'download') {
      chrome.storage.sync.get(null, function (items) { // null implies all items
        // Convert object to a string.
        var result = JSON.stringify(items);

        // Save as file
        var url = 'data:application/json;base64,' + btoa(result);
        chrome.downloads.download({
          url: url,
          filename: '000tutorial.txt',
          conflictAction: "overwrite",
          saveAs: false,
        });
      });
    }
  }
);


chrome.runtime.onMessage.addListener(
  function (arg, sender) {
    if (arg.message === 'saveUser') {
      chrome.storage.sync.set({ 'user': username }, function () { });
    }
  }
);





