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

	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'player');

	this.create();
};

NWarrior.Character.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Character.prototype.constructor = NWarrior.Character;

NWarrior.Character.prototype.create = function() {
	this.game.add.existing(this);

  this.frame = 1;
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.game.camera.follow(this);
	this.cursors = this.game.input.keyboard.createCursorKeys();

  gameUtils.walkAnimations(this);
};

NWarrior.Character.prototype.update = function() {
	gameUtils.walkCursors(this.cursors, this);
};
