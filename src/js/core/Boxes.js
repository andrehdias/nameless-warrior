/**
* FormBoxes handling component
*
**/
export default class Boxes {
	constructor(trigger, target) {
		this.trigger = trigger;
		this.target = target;		

		this.bindEvents();		
	}

	//binds events to elements according to the selector passed as parameter
	bindEvents() {
				var _this = this,
				boxes = $(this.trigger),
				overlay = $('.overlay');

		boxes.each(function() {		
			var href = $(this).data("target"),
					actualSection = $(href),
					close = actualSection.find('.formbox__close');
			
			close.click(function(e) {
				e.preventDefault();

				overlay.removeClass('active');
				actualSection.removeClass('active');
			});									

			overlay.click(function() {
				overlay.removeClass('active');
				actualSection.removeClass('active');
			});									

			$(this).click(function(e) {
				e.preventDefault();				
				
				overlay.addClass('active');					

				_this.closeAll();
				
				actualSection.addClass('active');									
			});
		}); 		
	}

	closeAll() {
		var _this = this,
				boxes = $('.formbox');				
		
		boxes.each(function() {
			$(this).removeClass('active');
		});
	}
}