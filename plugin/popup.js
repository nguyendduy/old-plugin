

var listURL = new Array();
var listTimestamp = new Array();
// var listFinal = new Array();


chrome.storage.local.get('url', function(result){
  if(result.url != null) {
    listURL = result.url;
  }
});






var myVar = setInterval(myTimer, 5000);

function myTimer() {
  var d = new Date();
  var url;
  document.getElementById("demo2").textContent = d.toLocaleTimeString();

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url; 
    document.getElementById('demo3').textContent = url;
    
  });

  chrome.storage.local.get('url', function(result){
    if(result.url != null) {
      listURL = result.url;
      listURL.push(url);
    }
  });
  //alert(listURL);
  chrome.storage.local.set({'url': listURL }, function(){});
  

  //document.getElementById('demo3').textContent = window.location;
  chrome.storage.local.get('time', function(result){
    if(result.time != null) {
        listTimestamp = result.time;
        listTimestamp.push(d.toLocaleTimeString());
    }
  });
  chrome.storage.local.set({'time': listTimestamp }, function(){});
  
  
  
}



document.addEventListener('DOMContentLoaded', function () {
	var button = document.getElementById("download");
	button.addEventListener('click', function(response) {
		chrome.runtime.sendMessage({from: 'popup'});
	});
});




  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('demo').textContent = "Extension loaded";
    var tryit = document.getElementById('try');

    tryit.addEventListener('click', function () {
      document.getElementById('demo').textContent = "You clicked on Try It!";
    });
});



document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('submit');
  button.addEventListener('click', function () {
      var text = document.getElementsByName('username')[0].value;
      users.push(text);
      var grpnum = Math.random();
     
      if (grpnum < 0.5) {
          grpnum = 1;
          document.getElementById('discovery').hidden = false;
          document.getElementById('shell').hidden = true;
      }
      else{
        grpnum = 2;
        document.getElementById('discovery').hidden = true;
        document.getElementById('shell').hidden = false;
      }
      var mess = text + ", you are in group " + grpnum + "!";
      document.getElementById('demo').innerHTML = mess;
      
      
      
  });

  
  var button = document.getElementById("download");
	button.addEventListener('click', function(response) {

    chrome.storage.local.get('time', function(result){
      if(result.time != null) {
          listTimestamp = result.time;
      }
    });

    chrome.storage.local.get('url', function(result){
      if(result.url != null) {
          listURL = result.url;
      }
    });

    if(listTimestamp.length == listURL.length) {
      finalList = new Array();
      var i;
      for (i = 0; i < clickList.length; i++) {
        var str1 = '[' + listTimestamp[i] + ',' + listURL[i] + ']';
        finalList.push(str1);
      }
    }

    chrome.downloads.download({
      url: "data:text/plain," + listURL,
      filename: "tutorial.txt",
      conflictAction: "overwrite", 
      saveAs: false,
  });
  });

});


