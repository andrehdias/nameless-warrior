NWarrior.GameMain = function() {
	this.init();
}

NWarrior.GameMain.prototype = {
	init: function() {
		if(!localStorage.getItem('NWarriorToken')) {
			window.location.assign('/');
		}

		this.gameWidth = $('.game__wrapper').width(),
   	this.gameHeight = window.innerHeight;

		NWarrior.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, 'phaser');

		NWarrior.game.state.add('Boot', NWarrior.Boot);
		NWarrior.game.state.add('Game', NWarrior.Game);					

		NWarrior.game.state.start('Boot');		
	}	
}