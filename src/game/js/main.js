var NWarrior = NWarrior || {},
    gameWidth = $('.game__wrapper').width(),
    gameHeight = window.innerHeight;

NWarrior.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser');

NWarrior.game.state.add('Boot', NWarrior.Boot);
NWarrior.game.state.add('Game', NWarrior.Game);

NWarrior.game.state.start('Boot');
