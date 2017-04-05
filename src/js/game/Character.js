import GLOBALS from '../core/Globals';
import config from 'config';
import Utils from '../core/Utils';

export default class Character extends Phaser.Sprite {
	constructor(game, data, type = GLOBALS.PLAYER, x, y, map) {
		super(game, x, y, data.characterClass);

    this.anchor.setTo(0.5, 0.5);

    this.map = map;
    this.mapBorderThreshold = 100;

    this.textY = 12;

    this.type = type;
    this.frame = 0;
    this.alive = true;

		this.setCharacterInfo(data);
	}

	setCharacterInfo(data, update = false) {
    data = data || this;

    this.classNumber = data.classNumber;
		this.characterClass = data.characterClass;

		this.strength = data.strength;
		this.strengthXP = data.strengthXP;
		this.constitution = data.constitution;
		this.constitutionXP = data.constitutionXP;
		this.dexterity = data.dexterity;
		this.dexterityXP = data.dexterityXP;
		this.intelligence = data.intelligence;
		this.intelligenceXP = data.intelligenceXP;
		this.charisma = data.charisma;
		this.charismaXP = data.charismaXP;

		this.health = data.health;
		this.currentHealth = data.currentHealth - 5;
		this.mana = data.mana;
		this.currentMana = data.currentMana;

    this.updatedAt = data.updatedAt;

	  this.speed = 220 + (this.dexterity * 2);

    if(!update) {
		  this.create();
    }

    if(this.type === GLOBALS.PLAYER) {
      this.updateCharacterStatusFormbox();
    }
	}

  bind() {
    $(window).on('keydown', ev => {
      const key = ev.keyCode;

      if(key === GLOBALS.KEY_CODES.A) {
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

    if(this.type === GLOBALS.PLAYER) {
      this.bind();
    }
	}

	update() {
    if(this.type === GLOBALS.PLAYER) {
      this.handleWalking();
      this.updateBars();
    }

    if(this.type === GLOBALS.ENEMY && this.playerNear) {

    }

    if(this.text && this.body) {
      this.textY -= 1;

      this.text.x = Math.floor(this.body.x + this.body.width / 2);
      this.text.y = Math.floor(this.body.y + this.body.height / 2 + this.textY);
    }
	}

	updateBars() {
		const hpVal = $('.bar--health .bar__value'),
          hpTxt = $('.bar--health .bar__text span'),
          mpVal = $('.bar--mana .bar__value'),
          mpTxt = $('.bar--mana .bar__text span');

		hpTxt.html(this.currentHealth+'/'+this.health);
		mpTxt.html(this.currentMana+'/'+this.mana);
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

  checkMapBorderProximity() {
    const characterPosition = { x: this.body.x, y: this.body.y },
          mapLimits = { x: this.map.width, y: this.map.height };

    if(characterPosition.x >= (mapLimits.x - this.mapBorderThreshold)) {
      return GLOBALS.DIRECTIONS.LEFT;
    } else if (characterPosition.x >= this.mapBorderThreshold) {
      return GLOBALS.DIRECTIONS.RIGHT;
    } else if (characterPosition.y <= (mapLimits.y - this.mapBorderThreshold)) {
      return GLOBALS.DIRECTIONS.UP;
    } else if (characterPosition.y >= this.mapBorderThreshold) {
      return GLOBALS.DIRECTIONS.DOWN;
    } else {
      return false;
    }
  }

  randomWalk(speed = 100) {
    this.randomWalkInterval = setInterval(() => {
      const direction = Math.floor(Math.random() * (6 - 1)) + 1;

      // checkMapBorder = this.checkMapBorderProximity()

      if(this.playerNear) {
        this.findPlayer();
        return;
      }
      if(this.checkMapBorder) {
        this.walk(checkMapBorder, speed);
        return;
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
    }, 250);
  }

  receiveAttack(character) {
    const frame = character.lastFrame || 0,
          direction = this.getDirection(frame);

    if(!this.receivingAttack) {
      this.receivingAttack = true;

      const bonus = Math.floor(Math.random() * (10 - 1)) + 1;
      const miss = Math.floor(Math.random() * (6 - 1)) + 1;
      const damage = (character.strength * 2) + bonus;

      this.textY = 12;

      if(miss > 4) {
        if(this.text) {
          this.text.text = 'miss';
        } else {
          this.text = this.game.add.text(0, 0, 'miss', GLOBALS.TEXT_STYLES.DAMAGE);
          this.text.anchor.set(0.5);
        }
      } else {
        this.currentHealth = this.currentHealth - damage;

        if(this.text) {
          this.text.text = damage;
        } else {
          this.text = this.game.add.text(0, 0, damage, GLOBALS.TEXT_STYLES.DAMAGE);
          this.text.anchor.set(0.5);
        }

        if(this.currentHealth <= 0) {
          this.alive = false;

          if(this.type === GLOBALS.ENEMY) {
            clearInterval(this.randomWalkInterval);
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.body.destroy();
            this.kill();
          } else if (this.type === GLOBALS.PLAYER) {
            this.setupDeadAnimation();
          }
        } else {
          this.stepBack(direction);
        }
      }

      setTimeout(() => {
        this.text.text = '';
      }, 500);

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

  saveCharacterStatus() {
    const characterId = localStorage.getItem('NWarriorCharID'),
          url = config.apiURL+'characters/updateStatus/'+characterId;

    const data = {
      strength: this.strength,
      strengthXP: this.strengthXP,
      constitution: this.constitution,
      constitutionXP: this.constitutionXP,
      dexterity: this.dexterity,
      dexterityXP: this.dexterityXP,
      intelligence: this.intelligence,
      intelligenceXP: this.intelligenceXP,
      charisma: this.charisma,
      charismaXP: this.charismaXP,
      health: this.health,
      currentHealth: this.currentHealth,
      mana: this.mana,
      currentMana: this.currentMana,
      token: localStorage.getItem('NWarriorToken')
    };

    $.ajax({
			type: "put",
			url: url,
			data: data,
			success: (data) => {
        console.log("Status Saved!");
        this.setCharacterInfo(undefined, true);
      }
    });
  }

  saveCharacterPosition(mapName) {
    const characterId = localStorage.getItem('NWarriorCharID'),
          url = config.apiURL+'characters/updateLocation/'+characterId,
          data = {
            lastPositionX: this.body.x,
            lastPositionY: this.body.y,
            lastMap: mapName,
            token: localStorage.getItem('NWarriorToken')
          };

    $.ajax({
			type: "put",
			url: url,
			data: data,
			success: (data) => {
        console.log("Location Saved!")
      }
    });
  }

  updateCharacterStatusFormbox() {
    const $characterStatusWrapper = $('.character-status__wrapper');

    $characterStatusWrapper.html('');

		Utils.getTemplate('characterStatus', (template) => {
      template = template.replace('{CharacterClass}', this.characterClass);
      template = template.replace('{LastSaved}', Utils.formatDate(this.updatedAt));
      template = template.replace('{Health}', this.health);
      template = template.replace('{CurrentHealth}', this.currentHealth);
      template = template.replace('{Mana}', this.mana);
      template = template.replace('{CurrentMana}', this.currentMana);
      template = template.replace('{Strength}', this.strength);
      template = template.replace('{StrengthXP}', this.strengthXP);
      template = template.replace('{Constitution}', this.constitution);
      template = template.replace('{ConstitutionXP}', this.constitutionXP);
      template = template.replace('{Dexterity}', this.dexterity);
      template = template.replace('{DexterityXP}', this.dexterityXP);
      template = template.replace('{Intelligence}', this.intelligence);
      template = template.replace('{IntelligenceXP}', this.intelligenceXP);
      template = template.replace('{Charisma}', this.charisma);
      template = template.replace('{CharismaXP}', this.charismaXP);
      template = template.replace('{ClassImg}', this.classNumber);

      $characterStatusWrapper.append(template);
		});
  }
}
