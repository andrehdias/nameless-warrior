NWarrior.Boot = function() {};

NWarrior.Boot.prototype = {
	preload: function() {		
		this.game.load.spritesheet('SwordsMan', 'img/classes/swordman_walk.png', 32, 32);			
		this.game.load.spritesheet('SwordsMan_attack', 'img/classes/swordman_attack.png', 32, 32);			
		this.game.load.spritesheet('SwordsMan_sleep', 'img/classes/swordman_sleep.png', 32, 32);			
		this.game.load.spritesheet('SwordsMan_dead', 'img/classes/swordman_dead.png', 32, 32);			

		this.game.load.spritesheet('Archer', 'img/classes/archer_walk.png', 32, 32);			
		this.game.load.spritesheet('Archer_attack', 'img/classes/archer_attack.png', 32, 32);			
		this.game.load.spritesheet('Archer_sleep', 'img/classes/archer_sleep.png', 32, 32);			
		this.game.load.spritesheet('Archer_dead', 'img/classes/archer_dead.png', 32, 32);			

		this.game.load.spritesheet('Mage', 'img/classes/mage_walk.png', 32, 32);			
		this.game.load.spritesheet('Mage_attack', 'img/classes/mage_attack.png', 32, 32);			
		this.game.load.spritesheet('Mage_sleep', 'img/classes/mage_sleep.png', 32, 32);			
		this.game.load.spritesheet('Mage_dead', 'img/classes/mage_dead.png', 32, 32);			
	},

	create: function() {
		NWarrior.game.state.start('Game');
	},

	setLoader: function() {
		this.loadingStyle = { font: "18px Helvetica", fill: "#fff"},
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", this.loadingStyle);
		
		this.loading.anchor.setTo(0.5);
	}
}