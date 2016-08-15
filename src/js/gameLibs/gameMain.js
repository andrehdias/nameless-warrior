var NWarrior = NWarrior || {},
    gameWidth = $('.game__wrapper').width(),
    gameHeight = window.innerHeight;

NWarrior.game = function() {
	this.init();
}

NWarrior.game.prototype = {
	init: function() {
		if(!localStorage.getItem('NWarriorToken')) {
			window.location.assign('/');
		}

		NWarrior.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser');

		NWarrior.game.state.add('Boot', NWarrior.Boot);
		NWarrior.game.state.add('Game', NWarrior.Game);					

		NWarrior.game.state.start('Boot');		

		this.loadCharacterInfo();
	},

	loadCharacterInfo: function() {
		var _this = this,
				loader = $('.loader'),
				userId = localStorage.getItem('NWarriorUserID'),
				url = config.apiURL+'character/'+userId,
				characterId = window.location.search.replace('?characterId=', ''),
				statsWrapper = $('.stats__wrapper');

		$.get('templates/characterStats.html', function(response) {
			var statsTemplate = response,
					data = {};

			data.token = localStorage.getItem('NWarriorToken');

			$.ajax({
				url: config.apiURL+'characters/'+characterId,
				type: 'get',
				data: data,
				success: function(character) {
			    loader.removeClass('active');

					var template = statsTemplate;

					template = template.replace('{Nickname}', character.nickname);
					template = template.replace('{Class}', formatClass(character.characterClass));
					template = template.replace('{Strength}', character.strength);
					template = template.replace('{Constitution}', character.constitution);
					template = template.replace('{Dexterity}', character.dexterity);
					template = template.replace('{Intelligence}', character.intelligence);
					template = template.replace('{Charisma}', character.charisma);

					template = template.replace('{Health}', character.health);
					template = template.replace('{Mana}', character.mana);
					template = template.replace('{Stamina}', character.stamina);
					template = template.replace('{Sleep}', character.sleep);
					template = template.replace('{Hunger}', character.hunger);

					statsWrapper.append(template);
			  },
				error: function(xhr, errorType, error) {				
					_this.logout();
				}
			});
		});
	}
}