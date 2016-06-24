var NWarrior = NWarrior || {};

NWarrior.Game = function(){};

NWarrior.Game.prototype = {
	create: function() {				
		this.game.time.advancedTiming = true;

		this.map = new NWarrior.Map(this.game);    		

		this.player = new NWarrior.Character(this.game);

    this.npc = new NWarrior.Npc(this.game);   

		this.hud = new NWarrior.Hud(this.game);    		
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npc);
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 430, "#000"); 
	}
}