NWarrior.Enemy = function(game){
	this.type;

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

	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'Enemy');    
  this.create();
};

NWarrior.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Enemy.prototype.constructor = NWarrior.Enemy;

NWarrior.Enemy.prototype.create = function() {	

};