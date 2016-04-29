// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

// closes all popboxes
var closePopboxes = function(actualPopbox) {
	var popboxes = document.querySelectorAll('.popbox');

	forEach(popboxes, function(index, popbox) {
		if(actualPopbox != popbox){
			popbox.classList.remove('active');					
		}
	});
};

(function() {	
	var popboxes = document.querySelectorAll('.open-popbox');

	forEach(popboxes, function(index, popbox) {		
		popbox.addEventListener('click', function(e) {
			var href = this.dataset.target;			

			closePopboxes(popbox);

			e.preventDefault();
			document.getElementById(href).classList.toggle('active');		
		});
	}); 	
})()
