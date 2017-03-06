import GLOBALS from '../core/Globals';
import config from 'config';

export default class Character extends Phaser.Sprite {
	constructor(game, data, type = GLOBALS.PLAYER) {
		super(game, game.world.randomX, game.world.randomY, data.characterClass);

    this.anchor.setTo(0.5, 0.5);

    this.type = type;
    this.input = this.game.input;

		this.setCharacterInfo(data);

    if(this.type === GLOBALS.PLAYER) {
      this.bind();
    }
	}

	setCharacterInfo(data) {
		this.characterClass = data.characterClass;

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
    this.alive = true;

		this.create();
	}

  bind() {
    $(window).on('keydown', ev => {
      const key = ev.key;

      if(key === 'a' || key === 'A') {
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

    if(this.type === GLOBALS.PLAYER) {
	    this.game.camera.follow(this);
    }

	  this.setupAnimations();

    if(this.type === GLOBALS.ENEMY) {
      this.body.immovable = true;
      this.randomWalk();
    }
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
	  const speed = this.speed;

	  let direction;

		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	    direction = 'left';
	  } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	    direction = 'right';
	  } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	    direction = 'up';
	  } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	    direction = 'down';
	  } else {
	    direction = 'stop';
	  }

    if(!this.attacking) {
		  this.walk(direction, speed);
    } else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
	}

	setupAnimations() {
    const loop = this.type === GLOBALS.ENEMY;

    this.animations.add('dead', [0, 1, 2], 3, true);
    this.animations.add('down', [0, 1, 2], 10, loop);
    this.animations.add('right', [3, 4, 5], 10, loop);
    this.animations.add('up', [6, 7, 8], 10, loop);
    this.animations.add('left', [9, 10, 11], 10, loop);
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
    this.anchor.setTo(0.5, 0.5);

    this.body.width = 64;
    this.body.height = 64;

    this.game.camera.follow(null);

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

  setupDeadAnimation() {
    const sprite = this.characterClass+'_dead';

    this.loadTexture(sprite);
    this.anchor.setTo(0.5, 0.5);

    this.body.width = 40;
    this.body.height = 40;

    this.animations.play('dead');
  }

  randomWalk(speed = 100) {
    this.randomWalkInterval = setInterval(() => {
      const direction = Math.floor(Math.random() * (6 - 1)) + 1;

      if(!this.receivingAttack && this.alive) {
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
      }
    }, 1000);
  }

  setupAttackEndCallback() {
    for (const id in this.animations._anims) {
      const anim = this.animations._anims[id];

      anim.onComplete.add(() => {
        if(this.attacking) {
          this.loadTexture(this.characterClass);

          this.anchor.setTo(0.5, 0.5);

          this.body.width = 32;
          this.body.height = 32;

          this.game.camera.follow(this);

          this.attacking = false;
        }
      }, this);
    }
  }

  stepBack(direction) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    switch(direction) {
      case 'up':
        this.body.velocity.y = -250;
        break;

      case 'down':
        this.body.velocity.y = 250;
        break;

      case 'left':
        this.body.velocity.x = -250;
        break;

      case 'right':
        this.body.velocity.x = 250;
        break;
    }

    this.animations.stop();

    setTimeout(() => {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }, 500);
  }

  receiveAttack(character) {
    const frame = character.lastFrame || 0,
          direction = this.getDirection(frame);

    if(!this.receivingAttack) {
      this.receivingAttack = true;

      this.currentHP = this.currentHP - (character.str * 2);

      if(this.currentHP <= 0) {
        this.alive = false;

        if(this.type === GLOBALS.ENEMY) {
          clearInterval(this.randomWalkInterval);
          this.body.velocity.x = 0;
          this.body.velocity.y = 0;
        }

        this.setupDeadAnimation();
      } else {
        this.stepBack(direction);
      }

      setTimeout(() => {
        this.receivingAttack = false;
      }, 300);
    }
  }
}
