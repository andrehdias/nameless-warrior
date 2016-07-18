Home = function() {
	this.apiURL = "http://localhost:8080/";
	this.formsSelector = "form";

	this.menuNotLogged = $('.menu--not-logged');
	this.loggedMenu = $('.menu--logged');
	this.notLoggedText = $('.not-logged--text');
	this.loggedText = $('.logged--text');

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

				if(!_this.validation(formTarget, form, result)) {
					_this.ajaxCall(formTarget, result, data);
				}
			});
		});

		$('.logout').click(function() {
			sessionStorage.clear();
			location.reload();
		});
	},

	validation: function(target, form, result) {
		var invalid = false;

		switch(target) {
			case 'users' :
				var password = form.find('[name=signupPassword]').val(),
						repeatPassword = form.find('[name=signupRepeatPassword]').val();

			  if (password != repeatPassword) {
          result.html('The passwords must be equal!');
          invalid = true;
        }
				break;

			case 'characters':
				var remainingStats = form.find('.remaining-stats').html();

				if(remainingStats !== 0) {
					result.html('You must distribute al attributes!');
					invalid = true;
				}
				break;
		}

		return invalid;
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
				$('.overlay').click();
				$('[data-target="#formbox-login"]').click();
			}, 500);
		}
	},

	handleLogin: function(data, result) {
		result.html(data.message);

		if(data.logged) {
			setTimeout(function() {
				$('.overlay').click();
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
		var form = $('[name="form_create"]'),
				stats = form.find('.stats__group'),
				remainingStats = form.find('.remaining-stats'),
				classSelect = form.find('[name=characterClass]');

		classSelect.change(function() {
			var classImg = $(this).val();

			form.find('.create__img img').attr('src', 'img/classes/'+classImg+'.png');
		});

		stats.each(function() {
			var	statsGroup = $(this),
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

		$('[name=userId]').val(sessionStorage.getItem('userID'));
	},

	handleCharacterCreation: function(data, result) {
		result.html(data.message);

		this.updateCharacterList();
	},

	updateCharacterList: function() {

	}
};
