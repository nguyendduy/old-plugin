// document.addEventListener('DOMContentLoaded', function () {
//   var button = document.getElementById('download');
//   button.addEventListener('click', function (response) {
//     chrome.runtime.sendMessage({ from: 'popup' });
//   });
// });

// var listURL = new Array();
// var listTimestamp = new Array();

// chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
//   var url = tabs[0].url;
//   document.getElementById('demo3').textContent = url;

//   listURL.push(url);
//   listURL.push('ahdsfdasjfha');
//   chrome.storage.local.set({ 'url': listURL }, function () { });


//   var d = new Date();
//   listTimestamp.push(d.toLocaleTimeString());
//   chrome.storage.local.set({ 'time': listTimestamp }, function () { });
// });


// var myVar = setInterval(myTimer, 5000);

// function myTimer() {
//   var d = new Date();
//   var url;

//   chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
//     url = tabs[0].url;
//   });

//   chrome.storage.local.get('url', function (result) {
//     if (result.url != null) {
//       document.getElementById('demo3').textContent = url;
//       listURL = result.url;
//       listURL.push(url);
//     }
//   });
//   chrome.storage.local.set({ 'url': listURL }, function () { });

//   chrome.storage.local.get('time', function (result) {
//     if (result.time != null) {
//       listTimestamp = result.time;
//       listTimestamp.push(d.toLocaleTimeString());
//     }
//   });
//   chrome.storage.local.set({ 'time': listTimestamp }, function () { });
// }













document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('download');
  button.addEventListener('click', function (response) {
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
  });
});

