var NWarrior = NWarrior || {},
    gameWidth = $('.game__wrapper').width(),
    gameHeight = window.innerHeight;

NWarrior.game = function() {
	this.init();
}

NWarrior.game.prototype = {
	init: function() {
		NWarrior.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser');

		NWarrior.game.state.add('Boot', NWarrior.Boot);
		NWarrior.game.state.add('Game', NWarrior.Game);

		NWarrior.game.state.start('Boot');		
	}	
}