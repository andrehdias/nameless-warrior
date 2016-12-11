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
	  		attack = false,
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
	  } else if (input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.attack(this);				  	
			!attack;
	  } else if (input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
	  	$('.dialog__wrapper').addClass('hide');
	  } else {
	    direction = 'stop';
	  }

	  if(!attack)
	  	this.walk(direction, this, speed);
	}

	setupAnimations(character) {
    character.animations.add('down', [0, 1, 2], 10, true);
    character.animations.add('right', [3, 4, 5], 10, true);
    character.animations.add('up', [6, 7, 8], 10, true);
    character.animations.add('left', [9, 10, 11], 10, true);    
  }

  walk(direction, character, speed = 50) {
    switch(direction){
      case 'down':
        character.lastFrame = 0;
        character.body.velocity.y = speed;
        character.body.velocity.x = 0;
        break;

      case 'right':
        character.lastFrame = 3;
        character.body.velocity.y = 0;
        character.body.velocity.x = speed;
        break;

      case 'up':
        character.lastFrame = 6;
        character.body.velocity.y = -speed;
        character.body.velocity.x = 0;
        break;

      case 'left':
        character.lastFrame = 9;
        character.body.velocity.x = -speed;
        character.body.velocity.y = 0;
        break;

      case 'stop':
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.frame = character.lastFrame;
        character.animations.stop();
        break;
    }

    character.animations.play(direction);
  }

  attack(character) {
    let frame = character.lastFrame || 0,
        direction = this.getDirection(frame),
        sprite = character.charClass+'_attack';

    character.loadTexture(sprite);    
    character.animations.play(direction);    
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
  
  randomWalk(character, speed = 150) {    
    setInterval(() => {
      let direction = Math.floor(Math.random() * (6 - 1)) + 1;

      switch(direction){
        case 1:
          this.walk('down', character, speed);
          break;

        case 2:
          this.walk('up', character, speed);
          break;

        case 3:
          this.walk('left', character, speed);
          break;

        case 4:
          this.walk('right', character, speed);
          break;

        case 5:
          this.walk('stop', character, speed);
          break;
      }
    }, 1000);
  }
}


