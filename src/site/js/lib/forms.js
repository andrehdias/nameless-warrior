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
			 		formAction = form.data("action"),
					formTarget = form.data("target"),
					params = new Object(),
					id = form.attr("id");
					result = form.find('.formbox__result'),
					data = {};

			if(formAction == 'signup') {
				if(_this.checkPass(form.find('[name=password]'), form.find('[name=repeat-password]'))){
					
				} else {
					
				}
			}

			form.submit(function(e) {
				e.preventDefault();				
												
				data = $(this).serializeArray();												
				data.push({name: "action", value: formAction});
				data.push({name: "target", value: formTarget});
				console.log(data)
								
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
			data: params,			
			success: function(data) {
		    loader.removeClass('active');
		    _this.handleReturn(data, target);
			}
		});		
	},

	handleReturn: function(data, result) {
		var returnData = JSON.parse(data);
		result.html(data.message);
		console.log(result)
	},

	login: function() {
		
	},

	checkPass: function(input, inputTwo) {

	}
};