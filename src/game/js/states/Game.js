var NWarrior = NWarrior || {};

NWarrior.Game = function(){
	this.npcsNumber = 20;
};

NWarrior.Game.prototype = {
	create: function() {				
		this.game.time.advancedTiming = true;

		this.map = new NWarrior.Map(this.game);    		

		this.player = new NWarrior.Character(this.game);

		this.npcs = [];
		this.npcsGroup = this.game.add.group();

		for(var i = 0; i < this.npcsNumber; i++) {
    	this.npcs[i] = new NWarrior.Npc(this.game);   
    	this.npcsGroup.add(this.npcs[i]);
		}

		this.hud = new NWarrior.Hud(this.game);    		
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npcsGroup);
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 430, "#000"); 
	}
}