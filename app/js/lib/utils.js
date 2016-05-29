// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback) {
  for (var i = 0; i < array.length; i++) {  	
    callback.call(null, i, array[i]); // passes back stuff we need
  }
};

var ajaxCall = function(target, url, params) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 && xhttp.status == 200) {
	    document.getElementById(target).innerHTML = xhttp.responseText;
	  }
	};
	
	if(params) {
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(params);
	}
};

var serialize = function(form) {
	
};
