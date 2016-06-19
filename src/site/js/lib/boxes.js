Boxes = function(trigger, target){
	this.trigger = trigger;
	this.target = target;		

	this.bindEvents();
};

Boxes.prototype = {
	//binds events to elements according to the selector passed as parameter
	bindEvents: function() {
				var _this = this,
				boxes = $(this.trigger),
				overlay = $('.overlay');

		boxes.each(function() {		
			var href = $(this).data("target"),
					actualSection = $(href);

			$(this).click(function(e) {
				e.preventDefault();				
				
				overlay.addClass('active');					

				overlay.click(function() {
					overlay.removeClass('active');
					actualSection.removeClass('active');
				});									

				_this.closeAll();
				
				actualSection.addClass('active');									
			});
		}); 		
	},

	closeAll: function() {
		var _this = this,
				boxes = $('.formbox');				
		
		boxes.each(function() {
			$(this).removeClass('active');
		});
	}
}