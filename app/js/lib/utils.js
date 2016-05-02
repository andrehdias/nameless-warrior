// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback) {
  for (var i = 0; i < array.length; i++) {  	
    callback.call(null, i, array[i]); // passes back stuff we need
  }
};