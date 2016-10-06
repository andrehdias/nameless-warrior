NWarrior.Character = function(game) {
	this.class;
	this.nickname;

	this.str;
	this.con;
	this.dex;
	this.int;
	this.cha;

	this.hp;
	this.mana;
	this.stamina;
	this.hunger;
	this.sleep;

	this.speed = 250;

	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'mage');

	this.create();
};

NWarrior.Character.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Character.prototype.constructor = NWarrior.Character;

NWarrior.Character.prototype.create = function() {
	this.game.add.existing(this);

  this.frame = 0;
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.game.camera.follow(this);

  gameUtils.walkAnimations(this);
};

NWarrior.Character.prototype.update = function() {
	this.handleKeys();

	this.updateStatus();
};

NWarrior.Character.prototype.updateStatus = function() {

};

NWarrior.Character.prototype.handleKeys = function () {
  var direction,
      input = this.game.input,
      running = input.keyboard.isDown(Phaser.Keyboard.SHIFT);

  speed = (running) ? this.speed + 250 : this.speed;

	if (input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    direction = 'left';
  } else if (input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    direction = 'right';
  } else if (input.keyboard.isDown(Phaser.Keyboard.UP)) {
    direction = 'up';
  } else if (input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    direction = 'down';
  } else {
    direction = 'stop';
  }

  gameUtils.walk(direction, this, speed);
};

