Forms = function() {
	this.selector = "form";

	this.bindEvents();
};

Forms.prototype = {
	bindEvents: function() {
		var _this = this,
		forms = document.querySelectorAll(this.selector);

		forEach(forms, function(index, form) {		
			var action = form.action;
			form.addEventListener("submit", function(e) {
				e.preventDefault();
				
				ajaxCall('result', 'api/index.php');
			});
		}); 		
	}
};