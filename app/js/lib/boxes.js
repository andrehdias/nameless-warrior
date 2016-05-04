Boxes = function(trigger, target, alwaysOpen, arrow){
	this.trigger = trigger;
	this.target = target;	

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

			if(_this.arrow){
				_this.setArrow(box, href);					
			}

			box.addEventListener('click', function(e) {
				e.preventDefault();				

				overlay.classList.add('active');

				overlay.addEventListener('click', function() {
					overlay.classList.remove('active');
					actualSection.classList.remove('active');
				});
				
				actualSection.classList.add('active');									
			});
		}); 		
	}
}