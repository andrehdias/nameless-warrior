var NWarrior = NWarrior || {};

NWarrior.Boot = function(){};

NWarrior.Boot.prototype = {
	preload: function() {						
		
	},

	create: function() {
		NWarrior.game.state.start('Game');
	}
}