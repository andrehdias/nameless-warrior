/**
* Homepage handling component
*
**/
import config from 'config';
import Utils from './Utils';
import Boxes from './Boxes';
import Game from '../game/Game';

export default class Home {
	constructor() {
		this.utils = new Utils();
		this.boxes = new Boxes('.open-formbox', '.formbox');

		this.formsSelector = ".form";

		this.menuNotLogged = $('.menu--not-logged');
		this.loggedMenu = $('.menu--logged');

		this.notLoggedText = $('.not-logged--text');
		this.loggedText = $('.logged--text');

		this.loggedInfo = $('.logged--info');

		this.bindEvents();
		this.checkLogin();		
	}

	bindEvents() {
		let _this = this,
				forms = $(this.formsSelector);

		forms.each(function() {
			let form = $(this),
					formTarget = form.data("target"),
					result = form.find('.formbox__result');

			form.submit(function(e) {
				let data = _this.utils.serializeObject($(this));

				e.preventDefault();

				if(!_this.validation(formTarget, form, result)) {
					_this.ajaxPOST(formTarget, result, data);
					_this.cleanForms(form, formTarget, result);
				}
			});
		});

		$('.logout').click(function() {
			_this.logout();			
		});

		$('.character__wrapper').on('click', '.character', function(e) {
			let characterId = $(this).data('character-id');

		  localStorage.setItem('NWarriorCharID', characterId);

			_this.boxes.closeAll();
			
			new Game();
		});
	}

	validation(target, form, result) {
		let invalid = false;

		switch(target) {
			case 'users' :
				let password = form.find('[name=signupPassword]').val(),
						repeatPassword = form.find('[name=signupRepeatPassword]').val();

			  if (password != repeatPassword) {
          result.html('The passwords must be equal!');
          invalid = true;
        }

				break;

			case 'characters':
				let remainingStats = form.find('.remaining-stats').html();

				if(remainingStats != 0) {					
					result.html('You must distribute all attributes!');
					invalid = true;
				}

				break;
		}

		return invalid;
	}

	cleanForms(form, target) {
		form.find('input[type=text]:not([readonly])').val('');

		switch(target) {
			case 'characters':
				form.find('.stats__input').val(5);
				form.find('.stats__counter').val(10);

				break;
		}
	}

	ajaxPOST(target, result, data) {
		let _this = this,
				loader = $('.loader'),
				url = config.apiURL+target;

		loader.addClass('active');

		data.token = localStorage.getItem('NWarriorToken');

		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(data) {				
		    loader.removeClass('active');

		  	if(data.failedAuth) {		    		    
		    	return _this.logout();
		    }

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
			},
			error: function(xhr, errorType, error) {				
				if(errorType == 403)
					_this.logout();
			}
		});
	}

	handleSignUp(data, result) {
		result.html(data.message);

		if(data.created) {
			setTimeout(function() {
				$('.overlay').click();
				$('[data-target="#formbox-login"]').click();
			}, 500);
		}
	}

	handleLogin(data, result) {
		result.html(data.message);

		if(data.logged) {
			setTimeout(function() {
				$('.overlay').click();
			}, 500);

			this.saveSession(data);
			this.checkLogin();
		}
	}

	saveSession(data) {
		localStorage.setItem('NWarriorUserID', data.userId);
		localStorage.setItem('NWarriorEmail', data.email);
    localStorage.setItem('NWarriorToken', data.token);
	}

	checkLogin() {
		if(localStorage.getItem('NWarriorToken')) {
			this.loggedInfo.find('span').html(localStorage.getItem('NWarriorEmail'));

			this.loggedMenu.removeClass('hide');
			this.loggedText.removeClass('hide');
			this.loggedInfo.removeClass('hide');
			this.menuNotLogged.addClass('hide');
			this.notLoggedText.addClass('hide');

			this.setupCharacterCreation();
			this.updateCharacterList();
		} else {
			this.loggedMenu.addClass('hide');
			this.loggedText.addClass('hide');
			this.loggedInfo.addClass('hide');
			this.menuNotLogged.removeClass('hide');
			this.notLoggedText.removeClass('hide');
		}
	}

	setupCharacterCreation() {
		let form = $('[name="form_create"]'),
				stats = form.find('.stats__group'),
				remainingStats = form.find('.remaining-stats'),
				classSelect = form.find('[name=characterClass]');

		classSelect.change(function() {
			let classImg = $(this).val();

			if(classImg) {
				form.find('.create__img img').attr('src', 'img/classes/'+classImg+'.png');				
			} else {				
				form.find('.create__img img').attr('src', '');				
			}
		});

		stats.each(function() {
			let	statsGroup = $(this),
					plusButton = statsGroup.find('.stats__btn--plus'),
					minusButton = statsGroup.find('.stats__btn--minus'),
					statsInput = statsGroup.find('.stats__input');

			plusButton.click(function(e) {
				e.preventDefault();

				let remainingStatsVal = remainingStats.html(),
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

				let remainingStatsVal = remainingStats.html(),
						statsVal = statsInput.val();

				if(remainingStatsVal < 10 && statsVal > 5) {
					statsVal--;

					statsInput.val(statsVal);
					remainingStatsVal++;

					remainingStats.html(remainingStatsVal);
				}
			});
		});

		$('[name=userId]').val(localStorage.getItem('NWarriorUserID'));
	}

	handleCharacterCreation(data, result) {
		result.html(data.message);

		setTimeout(function() {
			$('.overlay').click();
			$('[data-target="#formbox-select"]').click();
			result.html('');
			$('[name=characterClass]').val('');
			$('.create__img img').attr('src', '');
		}, 500);

		this.updateCharacterList();
	}

	updateCharacterList() {
		let _this = this,
				loader = $('.loader'),
				userId = localStorage.getItem('NWarriorUserID'),
				url = config.apiURL+'characters/byUser/'+userId,
				characterList = $('.character__wrapper');

		loader.addClass('active');

		$('.character__wrapper > *').remove();

		this.utils.getTemplate('characterSelection', function(template) {
			let characterTemplate = template,
					data = {};

			data.token = localStorage.getItem('NWarriorToken');

			$.ajax({
				url: url, 
				type: "get",
				data: data,
				success: function(data) {
			    loader.removeClass('active');

			    if(data.length) {
				    for (let i in data) {
				    	let character = data[i],
									template = characterTemplate;

							template = template.replace('{Nickname}', character.nickname);
							template = template.replace('{CharacterClass}', _this.utils.formatClass(character.characterClass));
							template = template.replace('{Strength}', character.strength);
							template = template.replace('{Constitution}', character.constitution);
							template = template.replace('{Dexterity}', character.dexterity);
							template = template.replace('{Intelligence}', character.intelligence);
							template = template.replace('{Charisma}', character.charisma);
							template = template.replace('{ClassImg}', character.characterClass);

							characterList.append('<div class="character" data-character-id="'+character._id+'">'+template+'</div>');
				    }
			    } else {
			    	characterList.append('<p>No characters found! Press "New Character" to create your first!</p>')
			    }
			  },
				error: function(xhr, errorType, error) {				
					_this.logout();
				}
			});
		});
	}

	logout() {
		localStorage.clear();
		location.reload();
	}
}