NWarrior.Npc = function(game){
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

		this.sprites = ['SwordsMan', 'Mage', 'Archer'];

		var rand = Math.floor((Math.random() * 2));

		Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, this.sprites[rand]);
    this.create();
};

NWarrior.Npc.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Npc.prototype.constructor = NWarrior.Character;

NWarrior.Npc.prototype.create = function() {
  this.game.add.existing(this);

  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.frame = 4;
  this.enableBody = true;

  gameUtils.walkAnimations(this);
  gameUtils.randomWalk(this, 50);
};

NWarrior.Npc.prototype.update = function() {
};
