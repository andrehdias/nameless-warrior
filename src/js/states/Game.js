NWarrior.Game = function(){
	this.npcsNumber = 10;
};

NWarrior.Game.prototype = {
	create: function() {
		this.game.time.advancedTiming = true;

    this.game.stage.backgroundColor = "#000";

		this.player = new NWarrior.Character(this.game);

		for(var i = 0; i < this.npcsNumber; i++) {
			new NWarrior.Npc(this.game);
		}

		this.hud = new NWarrior.Hud(this.game);
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npcsGroup);
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 660, "#000");
	}
}
