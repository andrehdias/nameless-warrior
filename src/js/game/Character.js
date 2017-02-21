import config from 'config';
import GLOBALS from '../core/Globals';

export default class Character extends Phaser.Sprite {
	constructor(game, data, type = GLOBALS.PLAYER) {
		super(game, game.world.randomX, game.world.randomY, data.characterClass);

    this.type = type;

		this.setCharacterInfo(data);

    if(this.type === GLOBALS.player) {
      this.bind();
    }
	}

	setCharacterInfo(data) {
		this.characterClass = data.characterClass;
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

	  this.frame = 0;
	  this.speed = 225;

		this.create();
	}

  bind() {
    $(document).on('keydown', ev => {
      const key = ev.key;

      if(key === 'Enter') {
        $('.dialog__wrapper').addClass('hide');
      }

      if(key === 'a') {
        if(!this.attacking) {
          this.attack();
        }
      }
    });

    this.setupAttackEndCallback();
  }

	create() {
		this.game.add.existing(this);
	  this.game.physics.arcade.enable(this);
	  this.body.collideWorldBounds = true;
	  this.game.camera.follow(this);

	  this.setupAnimations();
	}

	update() {
    if(this.type === GLOBALS.PLAYER) {
      this.handleWalking();
      this.updateBars();
    }
	}


	updateBars() {
		const hpVal = $('.bar--health .bar__value'),
          hpTxt = $('.bar--health .bar__text span'),
          mpVal = $('.bar--mana .bar__value'),
          mpTxt = $('.bar--mana .bar__text span');

		hpTxt.html(this.currentHP+'/'+this.HP);
		mpTxt.html(this.currentMP+'/'+this.MP);
	}

	handleWalking() {
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

		this.walk(direction, speed);
	}

	setupAnimations() {
    this.animations.add('down', [0, 1, 2], 10, false);
    this.animations.add('right', [3, 4, 5], 10, false);
    this.animations.add('up', [6, 7, 8], 10, false);
    this.animations.add('left', [9, 10, 11], 10, false);
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
        if(!this.attacking) {
          this.body.velocity.x = 0;
          this.body.velocity.y = 0;
          this.frame = this.lastFrame;
          this.animations.stop();
        }

        break;
    }

    this.animations.play(direction);
  }

  attack() {
    const frame = this.lastFrame || 0,
          direction = this.getDirection(frame),
          sprite = this.characterClass+'_attack';

    this.loadTexture(sprite);

    this.anchor.setTo(0.25, 0.25);

    this.attacking = true;

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

  setupAttackEndCallback() {
    for (const id in this.animations._anims) {
      const anim = this.animations._anims[id];

      anim.onComplete.add(() => {
        if(this.attacking) {
          this.loadTexture(this.characterClass);

          this.anchor.setTo(0, 0);

          this.attacking = false;
        }
      }, this);
    }
  }
}
