Home = function() {
	this.apiURL = "http://localhost:8080/";
	this.formsSelector = "form";

	this.menuNotLogged = Zepto('.menu--not-logged');
	this.loggedMenu = Zepto('.menu--logged');
	this.notLoggedText = Zepto('.not-logged--text');
	this.loggedText = Zepto('.logged--text');

	this.bindEvents();
	this.checkLogin();
};

Home.prototype = {
	bindEvents: function() {
		var _this = this,
		forms = $(this.formsSelector);

		forms.each(function() {		
			var form = $(this),					
					formTarget = form.data("target"),					
					result = form.find('.formbox__result');			
			
			form.submit(function(e) {
				var data = $(this).serializeObject(),
						invalid = false;

				e.preventDefault();

				switch(formTarget) {
					case 'users' :					
						var password = form.find('[name=signupPassword]').val(),
								repeatPassword = form.find('[name=signupRepeatPassword]').val();

					  if (password != repeatPassword) {
		          result.html('The passwords must be equal!');
		          invalid = true;
		        }
						break;
				}

				if(!invalid) {
					_this.ajaxCall(formTarget, result, data);					
				}
			});
		});

		Zepto('.logout').click(function() {
			sessionStorage.clear();
			location.reload();
		});
	},

	ajaxCall: function(target, result, data) {
		var _this = this,
				loader = $('.loader'),
				url = _this.apiURL+target;

		loader.addClass('active');

		$.ajax({
			type: "POST",			
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

		    	case 'characters':
		    		_this.handleCharacterCreation(data, result);
		    		break;
		    }
			}
		});
	},

	handleSignUp: function(data, result) {
		result.html(data.message);

		if(data.created) {
			setTimeout(function() {
				Zepto('.overlay').click();
				Zepto('[data-target="#formbox-login"]').click();
			}, 500);
		}
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

			this.setupCharacterCreation();
		} else {
			this.loggedMenu.hide();
			this.loggedText.hide();
			this.menuNotLogged.show();
			this.notLoggedText.show();
		}
	},

	setupCharacterCreation: function() {
		var form = Zepto('[name="form_create"]'),
				stats = form.find('.stats__group'),
				remainingStats = form.find('.remaining-stats');

		stats.each(function() {
			var	statsGroup = Zepto(this),
					plusButton = statsGroup.find('.stats__btn--plus'),
					minusButton = statsGroup.find('.stats__btn--minus'),
					statsInput = statsGroup.find('.stats__input');

			plusButton.click(function(e) {
				e.preventDefault();

				var remainingStatsVal = remainingStats.html(),
						statsVal = statsInput.val();

				if(remainingStatsVal > 0) {
					statsVal++;

					statsInput.val(statsVal);

					remainingStatsVal--;

					remainingStats.html(remainingStatsVal);
				}
			});

			minusButton.click(function(e) {
				e.preventDefault();

				var remainingStatsVal = remainingStats.html(),
						statsVal = statsInput.val();

				if(remainingStatsVal < 10 && statsVal > 5) {
					statsVal--;

					statsInput.val(statsVal);
					remainingStatsVal++;

					remainingStats.html(remainingStatsVal);
				}
			});
		});

		Zepto('[name=userId]').val(sessionStorage.getItem('userID'));
	},

	handleCharacterCreation: function(data, result) {
		result.html(data.message);

		this.updateCharacterList();
	},

	updateCharacterList: function() {

	}
};
