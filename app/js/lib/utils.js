// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback) {
  for (var i = 0; i < array.length; i++) {  	
    callback.call(null, i, array[i]); // passes back stuff we need
  }
};

var ajaxGET = function(target, url) {
	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    document.getElementById(target).innerHTML = xhttp.responseText;
	  }
	};
	xhttp.open("GET", url, true);
	xhttp.send();
};