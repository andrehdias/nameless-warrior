var NWarrior = NWarrior || {};

NWarrior.Game = function(){};

NWarrior.Game.prototype = {
	preload: function() {
		this.game.load.spritesheet('player', 'img/char.png', 31, 31);				
	},

	create: function() {
		this.game.stage.backgroundColor = '#3dd133';

    this.player = this.game.add.sprite(50, 50, 'player');

    this.game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('down', [1, 0, 2], 10, true);
  	this.player.animations.add('left', [4, 3, 5], 10, true);
  	this.player.animations.add('right', [7, 6, 8], 10, true);
  	this.player.animations.add('up', [10, 9, 11], 10, true);

    this.game.camera.follow(this.player);

 		this.cursors = game.input.keyboard.createCursorKeys();
	},

	update: function() {
	  this.player.body.velocity.x = 0;

	  if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
	  } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
	  } else if (this.cursors.up.isDown) {
	  	this.player.body.velocity.y = -150;
      this.player.animations.play('up');
	  } else if (this.cursors.down.isDown) {
	  	this.player.body.velocity.y = 150;
      this.player.animations.play('down');
	  } else {
      this.player.animations.stop();
      this.player.frame = 1;
	  }
	}
}