/**
* Homepage handling component
*
**/

Home = function() {
	this.apiURL = "http://localhost:8080/";
	this.formsSelector = "form";

	this.menuNotLogged = $('.menu--not-logged');
	this.loggedMenu = $('.menu--logged');

	this.notLoggedText = $('.not-logged--text');
	this.loggedText = $('.logged--text');

	this.loggedInfo = $('.logged--info');

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
				var data = $(this).serializeObject();						

				e.preventDefault();

				if(!_this.validation(formTarget, form, result)) {
					_this.ajaxPOST(formTarget, result, data);
					_this.cleanForms(form, formTarget, result);
				}
			});
		});

		$('.logout').click(function() {
			sessionStorage.clear();
			location.reload();
		});

		$('.character__wrapper').on('click', '.character', function(e) {
			var characterId = $(this).data('character-id');

			console.log('oeee')

			window.location.assign('/game/index.html?characterId=' + characterId);
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

				if(remainingStats != 0) {
					console.log(remainingStats)
					result.html('You must distribute all attributes!');
					invalid = true;
				}

				break;
		}

		return invalid;
	},

	cleanForms: function(form, target) {
		form.find('input[type=text]:not([readonly])').val('');

		switch(target) {
			case 'characters':
				form.find('.stats__input').val(5);
				form.find('.stats__counter').val(10);

				break;
		}
	},

	ajaxPOST: function(target, result, data) {
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
			this.loggedInfo.find('span').html(sessionStorage.getItem('email'));

			this.loggedMenu.show();
			this.loggedText.show();
			this.loggedInfo.show();
			this.menuNotLogged.hide();
			this.notLoggedText.hide();

			this.setupCharacterCreation();
			this.updateCharacterList();
		} else {
			this.loggedMenu.hide();
			this.loggedText.hide();
			this.loggedInfo.hide();
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

		setTimeout(function() {
			$('.overlay').click();
			$('[data-target="#formbox-select"]').click();
			result.html('');
		}, 500);

		this.updateCharacterList();
	},

	updateCharacterList: function() {
		var _this = this,
				loader = $('.loader'),
				userId = sessionStorage.getItem('userID'),
				url = _this.apiURL+'characters/byUser/'+userId,
				characterList = $('.character__wrapper');

		loader.addClass('active');

		$('.character__wrapper > :not(.character__template)').remove();

		$.ajax({
			type: "GET",
			url: url,			
			success: function(data) {
		    loader.removeClass('active');

		    if(data.length) {
			    for (var i in data) {
			    	var character = data[i],
								characterTemplate = $('.character__template').html();

						characterTemplate = characterTemplate.replace('{Nickname}', character.nickname);
						characterTemplate = characterTemplate.replace('{CharacterClass}', _this.formatClass(character.characterClass, character.gender));
						characterTemplate = characterTemplate.replace('{Strength}', character.strength);
						characterTemplate = characterTemplate.replace('{Constitution}', character.constitution);
						characterTemplate = characterTemplate.replace('{Dexterity}', character.dexterity);
						characterTemplate = characterTemplate.replace('{Intelligence}', character.intelligence);
						characterTemplate = characterTemplate.replace('{Charisma}', character.charisma);
						characterTemplate = characterTemplate.replace('{ClassImg}', character.characterClass);

						characterList.append('<div class="character" data-character-id="'+character._id+'">'+characterTemplate+'</div>');
			    }		    	
		    } else {
		    	characterList.append('<p>No characters found! Press "New Character" to create your first!</p>')
		    }
			}
		});
	},

	formatClass: function(characterClass, gender) {
		var gender = gender == 'F' ? 'Female' : 'Male',
				classString;

		switch(characterClass) {
			case '1':
				classString = gender + " Warrior";
				break;

			case '2':
				classString = gender + " Mage";
				break;

			case '3':
				classString = gender + " Archer";
				break;
		}

		return classString;
	}
};
