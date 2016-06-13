var NWarrior = NWarrior || {};

NWarrior.Boot = function(){};

NWarrior.Boot.prototype = {
	preload: function() {
		this.game.load.script('utils', 'js/lib/utils.js');
		this.game.load.script('character', 'js/lib/character.js');		
		this.game.load.script('hud', 'js/lib/hud.js');
		this.game.load.script('npc', 'js/lib/npc.js');
	},

	create: function() {
		NWarrior.game.state.start('Game');
	}
}