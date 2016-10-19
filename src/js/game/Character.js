NWarrior.Character = function(game) {
	this.game = game;

	this.speed = 250;
	
	this.getCharacterInfo();
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

	this.updateBars();
};

NWarrior.Character.prototype.getCharacterInfo =  function() {
	var _this = this,
			characterId = window.location.search.replace('?characterId=', ''),
			url = config.apiURL+'characters/'+characterId,
			data = {};

	data.token = localStorage.getItem('NWarriorToken');

	$.ajax({
		type: "get",
		url: url,
		data: data,
		success: function(data) {
			_this.setCharacterInfo(data);
		}
	});
};

NWarrior.Character.prototype.setCharacterInfo = function(data) {
	this.charClass = data.characterClass;
	this.nickname = data.nickname;

	this.str = data.strength;	
	this.con = data.constitution;
	this.dex = data.dexterity;
	this.int = data.intelligence;
	this.cha = data.charisma;

	this.HP = data.health;
	this.currentHP = data.currentHealth;
	this.MP = data.mana;
	this.currentMP = data.currentMana;
	
	Phaser.Sprite.call(this, this.game, this.game.world.randomX, this.game.world.randomY, formatClass(this.charClass));

	this.create();

	this.updateBars();
};

NWarrior.Character.prototype.updateBars = function() {
	var hpVal = $('.bar--health .bar__value'),
			hpTxt = $('.bar--health .bar__text span'),
			mpVal = $('.bar--mana .bar__value'),
			mpTxt = $('.bar--mana .bar__text span');

	hpTxt.html(this.currentHP+'/'+this.HP);
	mpTxt.html(this.currentMP+'/'+this.MP);
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

