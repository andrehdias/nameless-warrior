var NWarrior = NWarrior || {};

NWarrior.game = new Phaser.Game(768, 448, Phaser.AUTO, 'phaser');

NWarrior.game.state.add('Boot', NWarrior.Boot);
NWarrior.game.state.add('Game', NWarrior.Game);

NWarrior.game.state.start('Boot');
