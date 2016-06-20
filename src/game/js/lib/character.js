var NWarrior = NWarrior || {};

NWarrior.Character = function(game) {
	this.game = game;

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

  this.frame = 1;
  game.physics.arcade.enable(this);            
  this.body.collideWorldBounds = true;    
  utils.walkAnimations(this);
  this.game.camera.follow(this);

	this.init();
};

NWarrior.Character.prototype = {
	init: function() {

	}
}