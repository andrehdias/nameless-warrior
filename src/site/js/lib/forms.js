$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
  });
  return o;
};

Forms = function() {
	this.apiURL = "http://localhost:8080/";
	this.selector = "form";

	this.bindEvents();
};

Forms.prototype = {
	bindEvents: function() {
		var _this = this,
		forms = $(this.selector);

		forms.each(function() {		
			var form = $(this);					

			form.submit(function(e) {
				var formAction = form.data("action"),
						formTarget = form.data("target"),					
						result = form.find('.formbox__result'),
						data = $(this).serializeObject();			

						console.log(data)

				e.preventDefault();												
								
				_this.ajaxCall(formTarget, formAction, result, data);
			});
		}); 		
	},

	ajaxCall: function(target, action, result, data) {
		var _this = this,
				xhttp = new XMLHttpRequest(),
				loader = $('.loader');
		
		loader.addClass('active');						

		$.ajax({
			type: action,
			url: _this.apiURL+target,
			data: data,			
			success: function(data) {
		    loader.removeClass('active');
		    _this.handleReturn(data, result);
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