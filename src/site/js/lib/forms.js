Forms = function() {
	this.apiURL = "http://localhost:8080/";
	this.selector = "form";
	this.menuNotLogged = Zepto('.menu--not-logged');
	this.loggedMenu = Zepto('.menu--logged');
	this.notLoggedText = Zepto('.not-logged--text');
	this.loggedText = Zepto('.logged--text');

	this.bindEvents();
	this.checkLogin();
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

				e.preventDefault();												
								
				_this.ajaxCall(formTarget, formAction, result, data);
			});
		}); 		

		Zepto('.logout').click(function() {
			sessionStorage.clear();
			location.reload();
		});
	},

	ajaxCall: function(target, action, result, data) {
		var _this = this,
				loader = $('.loader'),
				url = _this.apiURL+target;
		
		loader.addClass('active');						

		$.ajax({
			type: action,			
			url: url,
			data: data,	
			success: function(data) {
		    loader.removeClass('active');

		    switch(target) {
		    	case 'users':
		    		_this.handleSignUp(data, result);
		    		break;

		    	case 'users/login':
		    		_this.handleLogin(data, result);
		    		break;
		    }
			}
		});		
	},

	handleSignUp: function(data, result) {
		result.html(data.message);
	},

	handleLogin: function(data, result) {		
		result.html(data.message);

		if(data.logged) {
			setTimeout(function() {
				Zepto('.overlay').click();
			}, 500);			

			this.saveSession(data);
			this.checkLogin();
		}
	},

	saveSession: function(data) {
		sessionStorage.setItem('userID', data.userId);
		sessionStorage.setItem('email', data.email);
	},

	checkLogin: function() {
		if(sessionStorage.getItem('userID')) {
			this.loggedText.find('b').html(sessionStorage.getItem('email'));

			this.loggedMenu.show();
			this.loggedText.show();
			this.menuNotLogged.hide();					
			this.notLoggedText.hide();
		} else {
			this.loggedMenu.hide();
			this.loggedText.hide();
			this.menuNotLogged.show();					
			this.notLoggedText.show();
		}
	}
};