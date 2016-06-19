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

	this.init();
};

NWarrior.Character.prototype = {
	init: function() {

	}
}