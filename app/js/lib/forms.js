Forms = function() {
	this.apiURL = "api/";
	this.selector = "form";

	this.bindEvents();
};

Forms.prototype = {
	bindEvents: function() {
		var _this = this,
		forms = $(this.selector);

		forms.each(function() {		
			var form = $(this);
			 		action = form.data("action"),
					target = form.data("target"),
					params = new Object(),
					id = form.attr("id");
					result = form.find('.formbox__result'),
					data = {};

			form.submit(function(e) {
				e.preventDefault();				
												
				data.action = action;
				data.target = target;
				data.formData = $(this).serializeArray();								

				_this.ajaxCall(result, data);
			});
		}); 		
	},

	ajaxCall: function(target, params) {
		var _this = this,
				xhttp = new XMLHttpRequest(),
				loader = $('.loader');
		
		loader.addClass('active');		

		$.ajax({
			type: "POST",
			url: _this.apiURL,
			data: JSON.stringify(params),
			contentType: "application/json",
			success: function(data) {
		    loader.removeClass('active');
		    _this.handleReturn(data);
			}
		});		
	},

	handleReturn: function(data) {
		console.log(data)
	},

	login: function() {
		
	}
};