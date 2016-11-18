NWarrior.Game = function(){
	this.npcsNumber = 10;
};

NWarrior.Game.prototype = {
	create: function() {
		this.game.time.advancedTiming = true;

    this.game.stage.backgroundColor = "#333";

		this.player = new NWarrior.Character(this.game);		

		this.hud = new NWarrior.Hud(this.game);
	},

	update: function() {
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 660, "#fff");
	}
}
