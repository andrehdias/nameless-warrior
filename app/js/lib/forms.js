Forms = function() {
	this.selector = "form";

	this.bindEvents();
};

Forms.prototype = {
	bindEvents: function() {
		var _this = this,
		forms = document.querySelectorAll(this.selector);

		forEach(forms, function(index, form) {		
			form.addEventListener("submit", function(e) {
				e.preventDefault();
				
				ajaxCall('formbox-signup', 'createcharacter.html');
			});
		}); 		
	}
};