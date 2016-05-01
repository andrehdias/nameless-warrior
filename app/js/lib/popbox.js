Popbox = function(selector){
	_this = this;

	_this.bindEvents(selector);
};

Popbox.prototype = {
	// closes all popboxes
	closePopboxes: function(actualPopbox) {
		var popboxes = document.querySelectorAll('.popbox');
		forEach(popboxes, function(index, popbox) {
			var href = popbox.id;
			
			if(actualPopbox != href){
				popbox.classList.remove('active');					
			}
		});
	},

	//binds events to elements according the selector passed as parameter
	bindEvents: function(selector) {
		var popboxes = document.querySelectorAll(selector),
				_this = this;

		forEach(popboxes, function(index, popbox) {		
			popbox.addEventListener('click', function(e) {
				var href = this.dataset.target;			

				_this.closePopboxes(href);

				e.preventDefault();
				document.getElementById(href).classList.toggle('active');
			});
		}); 		
	}
}