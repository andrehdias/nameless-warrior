Forms = function() {
	this.selector = "form";

	this.bindEvents();
};

Forms.prototype = {
	bindEvents: function() {
		var _this = this,
		forms = document.querySelectorAll(this.selector);

		forEach(forms, function(index, form) {		
			var action = form.dataset.action,
					targetClass = form.dataset.targetClass,
					data = new FormData(form),
					params = new Object();

			params.action = action;
			params.targetClass = targetClass;
			params.data = data;		

			form.addEventListener("submit", function(e) {
				e.preventDefault();
				
				console.log(params)
				ajaxCall('result', 'api/', params);
			});
		}); 		
	},

	login: function() {
		
	}
};