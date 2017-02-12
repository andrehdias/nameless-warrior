import config from 'config';

export default class Character extends Phaser.Sprite {
	constructor(game, data) {
		super(game, game.world.randomX, game.world.randomY, data.characterClass);

		this.setCharacterInfo(data);

		this.create();
	}

	create() {
		this.game.add.existing(this);

	  this.frame = 0;

	  this.game.physics.arcade.enable(this);

	  this.body.collideWorldBounds = true;

	  this.game.camera.follow(this);

	  this.setupAnimations(this);

	  this.speed = 300;
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
	  } else if (input.keyboard.isDown(Phaser.Keyboard.A) || this.attacking) {
			this.attack();
			this.attacking = true;
	  } else if (input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
	  	$('.dialog__wrapper').addClass('hide');
	  } else if(!this.attacking) {
	    direction = 'stop';
	  }

	  if(!this.attacking) {
			this.walk(direction, speed);
		}
	}

	setupAnimations() {
    this.animations.add('down', [0, 1, 2], 10, true);
    this.animations.add('right', [3, 4, 5], 10, true);
    this.animations.add('up', [6, 7, 8], 10, true);
    this.animations.add('left', [9, 10, 11], 10, true);
  }

  walk(direction, speed = 50) {
    switch(direction){
      case 'down':
        this.lastFrame = 0;
        this.body.velocity.y = speed;
        this.body.velocity.x = 0;
        break;

      case 'right':
        this.lastFrame = 3;
        this.body.velocity.y = 0;
        this.body.velocity.x = speed;
        break;

      case 'up':
        this.lastFrame = 6;
        this.body.velocity.y = -speed;
        this.body.velocity.x = 0;
        break;

      case 'left':
        this.lastFrame = 9;
        this.body.velocity.x = -speed;
        this.body.velocity.y = 0;
        break;

      case 'stop':
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.frame = this.lastFrame;
        this.animations.stop();
        break;
    }

    this.animations.play(direction);
  }

  attack() {
    let frame = this.lastFrame || 0,
        direction = this.getDirection(frame),
        sprite = this.charClass+'_attack';

    this.loadTexture(sprite);
		this.setupAnimations()
    this.animations.play(direction);
  }

  getDirection(frame) {
    switch(frame) {
      case 0:
        return 'down';
        break;

      case 3:
        return 'right';
        break;

      case 6:
        return 'up';
        break;

      case 9:
        return 'left';
        break;
    }
  }

  randomWalk(speed = 150) {
    setInterval(() => {
      let direction = Math.floor(Math.random() * (6 - 1)) + 1;

      switch(direction){
        case 1:
          this.walk('down', speed);
					break;

        case 2:
          this.walk('up', speed);
          break;

        case 3:
          this.walk('left', speed);
          break;

        case 4:
          this.walk('right', speed);
          break;

        case 5:
          this.walk('stop', speed);
          break;
      }
    }, 1000);
  }
}
