Boxes = function(trigger, target, alwaysOpen, arrow){
	this.trigger = trigger;
	this.target = target;
	this.arrow = (arrow) ? arrow : false;
	this.alwaysOpen = (alwaysOpen) ? alwaysOpen : false;

	this.bindEvents();
};

Boxes.prototype = {
	// closes all boxes
	closeBoxes: function(actualBox) {
		var boxes = document.querySelectorAll(this.target);
			
		forEach(boxes, function(index, box) {
			var href = box.id;
			
			if(actualBox != href){
				box.classList.remove('active');					
			}
		});
	},

	//binds events to elements according the selector passed as parameter
	bindEvents: function() {
		var boxes = document.querySelectorAll(this.trigger),
				_this = this;

		forEach(boxes, function(index, box) {		
			var href = box.dataset.target,
					actualSection = document.getElementById(href);			

			if(_this.arrow){
				_this.setArrow(box, href);					
			}

			box.addEventListener('click', function(e) {
				e.preventDefault();
				_this.closeBoxes(href);				

				if(_this.alwaysOpen) {
					actualSection.classList.add('active');					
				} else {
					actualSection.classList.toggle('active');										
				}
			});
		}); 		
	},

	setArrow: function(box, href) {
		var offset = box.offsetLeft,
				boxWidth = box.offsetWidth / 2;
				arrow = document.querySelector("#"+href+" .arrow"),
				boxOffset = document.querySelector('.content-menu__wrapper').offsetLeft,
				arrowPosition = offset - boxOffset + boxWidth - 10;
				console.log(boxWidth)
		arrow.style.left =  arrowPosition+"px";
	}
}