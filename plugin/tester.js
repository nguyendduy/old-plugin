var listTime = new Array();
var listURL = new Array();
var listFinal = new Array();

chrome.storage.sync.get('url', function (result) {
    if (result.url != null) {
        listURL = result.url;
    }
});

chrome.storage.sync.get('time', function (result) {
    if (result.time != null) {
        listTime = result.time;
    }
});

var myVar = setInterval(myTimer, 5000);

function myTimer() {
    var d = new Date();
    var url;

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        url = tabs[0].url;
    });

    chrome.storage.sync.get('url', function (result) {
        if (result.url != null) {
            listURL = result.url;
            listURL.push(url);
        }
    });

    chrome.storage.sync.set({ 'url': listURL }, function () { });


    //document.getElementById('demo3').textContent = window.location;
    chrome.storage.sync.get('time', function (result) {
        if (result.time != null) {
            listTimestamp = result.time;
            listTimestamp.push(d.toLocaleTimeString());
        }
    });
    chrome.storage.sync.set({ 'time': listTimestamp }, function () { });
    alert('finished tracking');
}







chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.from == 'popuup') {
        chrome.runtime.sendMessage();
    }
});