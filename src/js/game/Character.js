import config from 'config';
import Movement from './Movement';

export default class Character extends Phaser.Sprite {
	constructor(game, data) {
		super(game, game.world.randomX, game.world.randomY, data.characterClass);

		this.setCharacterInfo(data);

		this.create();
	}

	create() {
		this.movement = new Movement();

		this.game.add.existing(this);
	  this.frame = 0;

	  this.game.physics.arcade.enable(this);

	  this.body.collideWorldBounds = true;

	  this.game.camera.follow(this);

	  this.movement.setupAnimations(this);

	  this.speed = 200;	  
	}

	update() {
		this.handleKeys();
		this.updateBars();
	}

	setCharacterInfo(data) {
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

		this.create();

		this.bind();
	}

	updateBars() {
		let hpVal = $('.bar--health .bar__value'),
				hpTxt = $('.bar--health .bar__text span'),
				mpVal = $('.bar--mana .bar__value'),
				mpTxt = $('.bar--mana .bar__text span');

		hpTxt.html(this.currentHP+'/'+this.HP);
		mpTxt.html(this.currentMP+'/'+this.MP);
	}

	handleKeys() {
	  let direction,
	      input = this.game.input,
	      running = input.keyboard.isDown(Phaser.Keyboard.S),
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

	  this.movement.walk(direction, this, speed);
	}

	bind() {
		document.addEventListener('keydown', function(e) {
			if (e.keyCode == Phaser.Keyboard.A) {
				console.log('attack')
			}
		});
	}
}


