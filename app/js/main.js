var NWarrior = NWarrior || {},
		canvas = {width: 800, height: 600};

NWarrior.game = new Phaser.Game(canvas.width, canvas.height, Phaser.AUTO, 'phaser');

NWarrior.game.state.add('Preload', NWarrior.Preload);
NWarrior.game.state.add('Menu', NWarrior.Menu);
NWarrior.game.state.add('Game', NWarrior.Game);

NWarrior.game.state.start('Preload');
