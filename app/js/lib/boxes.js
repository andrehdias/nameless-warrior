Boxes = function(trigger, target){
	this.trigger = trigger;
	this.target = target;	
	this.overlayAlways = (document.querySelector('body').dataset.overlay) ? document.querySelector('body').dataset.overlay : false;

	this.bindEvents();
};

Boxes.prototype = {
	//binds events to elements according the selector passed as parameter
	bindEvents: function() {
				var _this = this,
				boxes = document.querySelectorAll(this.trigger),
				overlay = document.querySelector('.overlay');

		forEach(boxes, function(index, box) {		
			var href = box.dataset.target,
					actualSection = document.getElementById(href);

			box.addEventListener('click', function(e) {
				e.preventDefault();				

				if(!_this.overlayAlways) {
					overlay.classList.add('active');					

					overlay.addEventListener('click', function() {
						overlay.classList.remove('active');
						actualSection.classList.remove('active');
					});					
				}

				_this.closeAll();
				
				actualSection.classList.add('active');									
			});
		}); 		
	},

	closeAll: function() {
		var _this = this,
				boxes = document.querySelectorAll('.formbox');				
		
		forEach(boxes, function(index, box) {
				box.classList.remove('active');
		});
	}
}