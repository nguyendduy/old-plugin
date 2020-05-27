var submitted = 0;



document.addEventListener('DOMContentLoaded', function () {
  if (submitted == 0) {
    document.getElementById('prompt').hidden = false;
    document.getElementById('submit').hidden = false;
    document.getElementById('username').hidden = false;
  }

  var button = document.getElementById('download');
  button.addEventListener('click', function (response) {
    chrome.runtime.sendMessage({ 'message': 'download' });
  });


  var button = document.getElementById('submit');
  button.addEventListener('click', function () {
    submited = 1;
    document.getElementById('prompt').hidden = true;
    document.getElementById('submit').hidden = true;
    document.getElementById('username').hidden = true;
    var text = document.getElementsByName('username')[0].value;
    document.getElementById('demo').innerHTML = text;
    // chrome.runtime.sendMessage({ 'message': 'saveUser', 'username': text });
    var grpnum = Math.random();
    if (grpnum < 0.5) {
      grpnum = 1;
      document.getElementById('discovery').hidden = false;
      document.getElementById('shell').hidden = true;
    }
    else {
      grpnum = 2;
      document.getElementById('discovery').hidden = true;
      document.getElementById('shell').hidden = false;
    }
    var mess = text + ", you are in group " + grpnum + "!";
    document.getElementById('demo').innerHTML = mess;

  });
});


