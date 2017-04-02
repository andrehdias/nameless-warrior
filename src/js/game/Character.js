import GLOBALS from '../core/Globals';
import config from 'config';

export default class Character extends Phaser.Sprite {
	constructor(game, data, type = GLOBALS.PLAYER, x, y) {
		super(game, x, y, data.characterClass);

    this.anchor.setTo(0.5, 0.5);

    this.type = type;

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

    if(this.type === GLOBALS.ENEMY && this.playerNear) {

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

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	    direction = GLOBALS.DIRECTIONS.LEFT;
	  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	    direction = GLOBALS.DIRECTIONS.RIGHT;
	  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	    direction = GLOBALS.DIRECTIONS.UP;
	  } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	    direction = GLOBALS.DIRECTIONS.DOWN;
	  } else {
	    direction = GLOBALS.DIRECTIONS.STOP;
	  }

    if(!this.attacking) {
		  this.walk(direction, speed);
    } else {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
	}

	setupAnimations() {
    if(this.type === GLOBALS.PLAYER) {
      this.animations.add('dead', [0, 1, 2], 3, true);
      this.animations.add(GLOBALS.DIRECTIONS.DOWN, [0, 1, 2], 10, false);
      this.animations.add(GLOBALS.DIRECTIONS.RIGHT, [3, 4, 5], 10, false);
      this.animations.add(GLOBALS.DIRECTIONS.UP, [6, 7, 8], 10, false);
      this.animations.add(GLOBALS.DIRECTIONS.LEFT, [9, 10, 11], 10, false);
    } else if (this.type === GLOBALS.ENEMY) {
      this.animations.add(GLOBALS.DIRECTIONS.DOWN, [1, 2, 3], 10, true);
      this.animations.add(GLOBALS.DIRECTIONS.RIGHT, [4, 5, 6], 10, true);
      this.animations.add(GLOBALS.DIRECTIONS.UP, [7, 8, 9], 10, true);
      this.animations.add(GLOBALS.DIRECTIONS.LEFT, [10, 11, 12], 10, true);
    }
  }

  turnSprite(direction) {
    let frame;

    switch(direction) {
      case GLOBALS.DIRECTIONS.UP:
        frame = 0;
        break;

      case GLOBALS.DIRECTIONS.RIGHT:
        frame = 3;
        break;

      case GLOBALS.DIRECTIONS.DOWN:
        frame = 6;
        break;

      case GLOBALS.DIRECTIONS.LEFT:
        frame = 9;
        break;
    }

    this.frame = frame;
  }

  walk(direction, speed = 50) {
    switch(direction){
      case GLOBALS.DIRECTIONS.DOWN:
        this.lastFrame = 0;
        this.body.velocity.y = speed;
        this.body.velocity.x = 0;
        break;

      case GLOBALS.DIRECTIONS.RIGHT:
        this.lastFrame = 3;
        this.body.velocity.y = 0;
        this.body.velocity.x = speed;
        break;

      case GLOBALS.DIRECTIONS.UP:
        this.lastFrame = 6;
        this.body.velocity.y = -speed;
        this.body.velocity.x = 0;
        break;

      case GLOBALS.DIRECTIONS.LEFT:
        this.lastFrame = 9;
        this.body.velocity.x = -speed;
        this.body.velocity.y = 0;
        break;

      case GLOBALS.DIRECTIONS.STOP:
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
        return GLOBALS.DIRECTIONS.DOWN;
        break;

      case 3:
        return GLOBALS.DIRECTIONS.RIGHT;
        break;

      case 6:
        return GLOBALS.DIRECTIONS.UP;
        break;

      case 9:
        return GLOBALS.DIRECTIONS.LEFT;
        break;
    }
  }

  setupDeadAnimation() {
    const sprite = this.characterClass+'_dead';

    this.loadTexture(sprite);
    this.anchor.setTo(0.5, 0.5);

    this.body.width = 64;
    this.body.height = 64;

    this.animations.play('dead');
  }

  randomWalk(speed = 100) {
    this.randomWalkInterval = setInterval(() => {
      const direction = Math.floor(Math.random() * (6 - 1)) + 1;

      if(this.playerNear) {
        this.findPlayer();
      }

      if(!this.receivingAttack && !this.playerNear && this.alive) {
        switch(direction){
          case 1:
            this.walk(GLOBALS.DIRECTIONS.DOWN, speed);
            break;

          case 2:
            this.walk(GLOBALS.DIRECTIONS.UP, speed);
            break;

          case 3:
            this.walk(GLOBALS.DIRECTIONS.LEFT, speed);
            break;

          case 4:
            this.walk(GLOBALS.DIRECTIONS.RIGHT, speed);
            break;

          case 5:
            this.walk(GLOBALS.DIRECTIONS.STOP, speed);
            break;
        }
      }
    }, 800);
  }

  findPlayer() {

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
      case GLOBALS.DIRECTIONS.UP:
        this.body.velocity.y = -250;
        break;

      case GLOBALS.DIRECTIONS.DOWN:
        this.body.velocity.y = 250;
        break;

      case GLOBALS.DIRECTIONS.LEFT:
        this.body.velocity.x = -250;
        break;

      case GLOBALS.DIRECTIONS.RIGHT:
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
        } else if (this.type === GLOBALS.PLAYER) {
          this.setupDeadAnimation();
        }
      } else {
        this.stepBack(direction);
      }

      setTimeout(() => {
        this.receivingAttack = false;
      }, 300);
    }
  }

  checkPlayerPosition(player) {
    const playerX = player.body.x,
          playerY = player.body.y,
          proximity = 100;

    if((this.body.x <= (playerX - proximity)
        || this.body.x <= (playerX + proximity)) && (this.body.y <= (playerY - proximity)
        || this.body.y <= (playerY + proximity))) {
      this.playerNear = true;
    } else {
      this.playerNear = false;
    }
  }
}
