var NWarrior = NWarrior || {};

NWarrior.Menu = function(){};

NWarrior.Menu.prototype = {
	preload: function() {
		this.game.load.image('logo', 'img/logo.png');
		this.game.load.spritesheet('continueGame', 'img/continueGameSprite.png', 500, 100);		
	},

	create: function() {
		this.game.stage.backgroundColor = '#333';

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//position and scale game logo
		var logoSprite = this.game.add.sprite(this.game.world.centerX, 250, 'logo');
		logoSprite.scale.setTo(0.7, 0.7);		
		
		var continueGame = this.game.add.button(this.game.world.centerX, 360, 'continueGame', this.gameState, this, 0, 1);
		continueGame.scale.setTo(0.5, 0.5);		

		utils.centerGameObjects([logoSprite, continueGame]);
	},

	update: function() {

	},

	gameState: function() {
		NWarrior.game.state.start('Game');
	}
};
