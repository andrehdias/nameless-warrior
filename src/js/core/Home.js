/**
* Homepage handling component
*
**/
import config from 'config';
import Utils from './Utils';
import Boxes from './Boxes';
import StartGame from '../game/StartGame';

export default class Home {
	constructor() {
		this.boxes = new Boxes('.open-formbox', '.formbox');

		this.formsSelector = ".form";

    this.isChrome = Utils.isChrome();

		this.menuNotLogged = $('.menu--not-logged');
		this.loggedMenu = $('.menu--logged');

		this.notLoggedText = $('.not-logged--text');
		this.loggedText = $('.logged--text');

		this.loggedInfo = $('.logged--info');

    $('.tooltip').tooltipster({
      contentAsHTML: true
    });

		this.bindEvents();
		this.checkLogin();

    if(!this.isChrome) {
      $('.footer').removeClass('hide');
    }
	}

	bindEvents() {
		const _this = this,
				  forms = $(this.formsSelector);

		forms.each(function() {
			const form = $(this),
            formTarget = form.data("target"),
            result = form.find('.formbox__result');

			form.submit(function(e) {
				const data = Utils.serializeObject($(this));

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
			const characterId = $(this).data('character-id');

		  localStorage.setItem('NWarriorCharID', characterId);

			_this.boxes.closeAll();

			$('.content').addClass('hide');
			$('.game__wrapper').removeClass('hide');

			new StartGame();
		});
	}

	validation(target, form, result) {
		let invalid = false;

		switch(target) {
			case 'users' :
				const password = form.find('[name=signupPassword]').val(),
						  repeatPassword = form.find('[name=signupRepeatPassword]').val();

			  if (password != repeatPassword) {
          result.html('The passwords must be equal!');
          invalid = true;
        }

				break;

			case 'characters':
				const remainingStats = form.find('.remaining-stats').html(),
              selectedClass = form.find('[name="characterClass"]').val();

				if(selectedClass === "") {
          result.html('You must select a character class!');
					invalid = true;
        } else if(remainingStats != 0) {
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
        form.find('.formbox__group__character').addClass('active');
        form.find('[name=characterClass]').val('');

				break;
		}
	}

	ajaxPOST(target, result, data) {
		const _this = this,
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
			setTimeout(() => {
				this.boxes.closeAll();
				$('[data-target="#formbox-login"]').click();
			}, 500);
		}
	}

	handleLogin(data, result) {
		result.html(data.message);

		if(data.logged) {
			setTimeout(() => {
				this.boxes.closeAll();
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
		const form = $('[name="form_create"]'),
          selectedClass = form.find('[name="characterClass"]'),
          stats = form.find('.stats__group'),
          remainingStats = form.find('.remaining-stats');

		$('.formbox__group__character').on('click', (e) => {
      const currentClass = $(e.currentTarget),
            classNumber = currentClass.data('characterClass');

      $('.formbox__group__character').removeClass('active');
      currentClass.addClass('active');
      selectedClass.val(classNumber);
    });

		stats.each(function() {
			const	statsGroup = $(this),
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

		setTimeout(() => {
			this.boxes.closeAll();
			$('[data-target="#formbox-select"]').click();
			result.html('');
      $('.remaining-stats').html(10);
		}, 500);

		this.updateCharacterList();
	}

	updateCharacterList() {
		const _this = this,
          loader = $('.loader'),
          userId = localStorage.getItem('NWarriorUserID'),
          url = config.apiURL+'characters/byUser/'+userId,
          characterList = $('.character__wrapper');

		loader.addClass('active');

		$('.character__wrapper > *').remove();

		Utils.getTemplate('characterSelection', function(template) {
			const characterTemplate = template;

		  let	data = {};

			data.token = localStorage.getItem('NWarriorToken');

			$.ajax({
				url: url,
				type: "get",
				data: data,
				success: (data) => {
			    loader.removeClass('active');

			    if(data.length) {
				    for (let i in data) {
				    	let character = data[i],
									template = characterTemplate;

							template = template.replace('{LastSaved}', Utils.formatDate(character.updatedAt));
							template = template.replace('{CharacterClass}', Utils.formatClass(character.characterClass));
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
