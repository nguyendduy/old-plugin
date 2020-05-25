chrome.runtime.onMessage.addListener(
    function (arg, sender) {
        chrome.storage.local.get('time', function (result) {
            if (result.time != null) {
                chrome.downloads.download({
                    url: "data:text/plain," + result.time,
                    filename: "discovery.txt",
                    conflictAction: "overwrite",
                    saveAs: false,
                });
            }
        });
    });