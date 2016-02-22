var NWarrior = NWarrior || {};

NWarrior.Preload = function(){};

NWarrior.Preload.prototype = {
	preload: function() {
		this.game.load.script('utils', 'js/lib/utils.js');
	},

	create: function() {
		NWarrior.game.state.start('Menu');
	}
}