NWarrior.Game = function(){
	this.npcsNumber = 10;
};

NWarrior.Game.prototype = {
	create: function() {
		this.game.time.advancedTiming = true;

    this.game.stage.backgroundColor = "#333";

		this.player = new NWarrior.Character(this.game);		

		this.npcs = this.game.add.group();

		for (var i = 0; i < this.npcsNumber; i++) {
			this.npcs[i] = new NWarrior.Npc(this.game);			
		};

		this.hud = new NWarrior.Hud(this.game);
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npcsGroup);
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 660, "#fff");
	}
}
