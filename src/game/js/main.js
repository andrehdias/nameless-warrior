var NWarrior = NWarrior || {};

NWarrior.game = new Phaser.Game($('.game__wrapper').width(), window.innerHeight, Phaser.AUTO, 'phaser');

NWarrior.game.state.add('Boot', NWarrior.Boot);
NWarrior.game.state.add('Game', NWarrior.Game);

NWarrior.game.state.start('Boot');
