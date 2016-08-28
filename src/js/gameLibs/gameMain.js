NWarrior.game = function() {
	this.init();
}

NWarrior.game.prototype = {
	init: function() {
		if(!localStorage.getItem('NWarriorToken')) {
			window.location.assign('/');
		}

		this.gameWidth = $('.game__wrapper').width(),
   	this.gameHeight = window.innerHeight;

		NWarrior.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, 'phaser');

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

		getTemplate('characterStats', function(response) {
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

					template = template.replace(new RegExp('{Strength}', 'g'), character.strength);
					template = template.replace(new RegExp('{StrengthXP}', 'g'), character.strengthXP);
					template = template.replace(new RegExp('{Constitution}', 'g'), character.constitution);
					template = template.replace(new RegExp('{ConstitutionXP}', 'g'), character.constitutionXP);
					template = template.replace(new RegExp('{Dexterity}', 'g'), character.dexterity);
					template = template.replace(new RegExp('{DexterityXP}', 'g'), character.dexterityXP);
					template = template.replace(new RegExp('{Intelligence}', 'g'), character.intelligence);
					template = template.replace(new RegExp('{IntelligenceXP}', 'g'), character.intelligenceXP);
					template = template.replace(new RegExp('{Charisma}', 'g'), character.charisma);
					template = template.replace(new RegExp('{CharismaXP}', 'g'), character.charismaXP);

					template = template.replace(new RegExp('{Health}', 'g'), character.health);
					template = template.replace(new RegExp('{CurrentHealth}', 'g'), character.currentHealth);
					template = template.replace(new RegExp('{Mana}', 'g'), character.mana);
					template = template.replace(new RegExp('{CurrentMana}', 'g'), character.currentMana);
					template = template.replace(new RegExp('{Stamina}', 'g'), character.stamina);
					template = template.replace(new RegExp('{CurrentStamina}', 'g'), character.currentStamina);
					template = template.replace(new RegExp('{Sleep}', 'g'), character.sleep);
					template = template.replace(new RegExp('{CurrentSleep}', 'g'), character.currentSleep);
					template = template.replace(new RegExp('{Hunger}', 'g'), character.hunger);
					template = template.replace(new RegExp('{CurrentHunger}', 'g'), character.currentHunger);					

					statsWrapper.append(template);
			  },
				error: function(xhr, errorType, error) {				
					window.location.assign('/');
				}
			});
		});
	}
}