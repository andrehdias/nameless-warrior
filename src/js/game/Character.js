import GLOBALS from '../core/Globals';
import config from 'config';
import Utils from '../core/Utils';

export default class Character extends Phaser.Sprite {
	constructor(game, data, type = GLOBALS.PLAYER, x, y, map) {
		super(game, x, y, data.characterClass);

    this.anchor.setTo(0.5, 0.5);

    this.map = map;
    this.mapBorderThreshold = 100;
    this.playerProximityTreshold = 120;

    this.lastDirection = GLOBALS.DIRECTIONS.DOWN;

    this.textY = 12;

    this.type = type;
    this.frame = 0;
    this.alive = true;
    this.playerNear = false;

		this.setCharacterInfo(data);

    if(this.characterClass === GLOBALS.ARCHER) {
      this.arrows = [];
    }

    if(this.characterClass === GLOBALS.MAGE) {
      $('.bar--mana').removeClass('hide');
    }
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
		this.currentHealth = data.currentHealth;
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
    if(!this.map.isCity) {
      $(window).on('keydown', ev => {
        const key = ev.keyCode;

        if(key === GLOBALS.KEY_CODES.A) {
          if(!this.attacking) {
            this.attack();
          }
        }
      });
    }

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
      if(!this.healing && this.currentHealth !== this.health && this.alive && !this.inCombat) {
        this.currentHealth++;
        this.healing = true;

        setTimeout(() => {
          this.healing = false;
        }, 1000);
      }

      if(!this.alive) {
        this.animations.play('dead');
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      } else {
        this.handleWalking();

        if(this.arrows) {
          this.handleArrows();
        }
      }

      this.updateBars();
    }

    if(this.text && this.body && this.alive) {
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

    let hpPercentage = (this.currentHealth / (this.health * 100)) * 10000;

    hpPercentage = hpPercentage.toFixed(0)+"%";
    hpVal.css('width', hpPercentage);

		hpTxt.html(this.currentHealth+'/'+this.health);
		mpTxt.html(this.currentMana+'/'+this.mana);
	}

	handleWalking() {
	  const speed = this.speed;
	  let direction;

    if(this.attacking) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      return;
    }

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

    if(!this.receivingAttack) {
		  this.walk(direction, speed);
    }
	}

  handleArrows() {
    const speed = this.dexterity * 1.00;

    this.arrows.forEach((arrow) => {
      if(!arrow.destroyed) {
        switch(arrow.direction) {
          case GLOBALS.DIRECTIONS.UP:
            arrow.object.y -= speed;
            break;
          case GLOBALS.DIRECTIONS.DOWN:
            arrow.object.y += speed;
            break;
          case GLOBALS.DIRECTIONS.LEFT:
            arrow.object.x -= speed;
            break;
          case GLOBALS.DIRECTIONS.RIGHT:
            arrow.object.x += speed;
            break;
        }

        if((arrow.object.y <= 0) || (arrow.object.y >= this.map.width) || (arrow.object.x <= 0) || (arrow.object.x >= this.map.height)) {
          arrow.object.destroy();
          arrow.destroyed = true;
          arrow = null;
        }
      }
    });
  }

	setupAnimations() {
    if(this.type === GLOBALS.PLAYER) {
      this.animations.add('dead', [0, 1, 2], 3, true);
      this.animations.add(GLOBALS.DIRECTIONS.DOWN, [0, 1, 2], 10, false);
      this.animations.add(GLOBALS.DIRECTIONS.RIGHT, [3, 4, 5], 10, false);
      this.animations.add(GLOBALS.DIRECTIONS.UP, [6, 7, 8], 10, false);
      this.animations.add(GLOBALS.DIRECTIONS.LEFT, [9, 10, 11], 10, false);
    } else if (this.type === GLOBALS.ENEMY) {
      this.animations.add(GLOBALS.DIRECTIONS.DOWN, [0, 1, 2], 10, true);
      this.animations.add(GLOBALS.DIRECTIONS.RIGHT, [3, 4, 5], 10, true);
      this.animations.add(GLOBALS.DIRECTIONS.UP, [6, 7, 8], 10, true);
      this.animations.add(GLOBALS.DIRECTIONS.LEFT, [9, 10, 11], 10, true);
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
        this.lastDirection = GLOBALS.DIRECTIONS.DOWN;
        this.body.velocity.y = speed;
        this.body.velocity.x = 0;
        break;

      case GLOBALS.DIRECTIONS.RIGHT:
        this.lastFrame = 3;
        this.lastDirection = GLOBALS.DIRECTIONS.RIGHT;
        this.body.velocity.y = 0;
        this.body.velocity.x = speed;
        break;

      case GLOBALS.DIRECTIONS.UP:
        this.lastFrame = 6;
        this.lastDirection = GLOBALS.DIRECTIONS.UP;
        this.body.velocity.y = -speed;
        this.body.velocity.x = 0;
        break;

      case GLOBALS.DIRECTIONS.LEFT:
        this.lastFrame = 9;
        this.lastDirection = GLOBALS.DIRECTIONS.LEFT;
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

    if(this.characterClass === GLOBALS.ARCHER) {
      setTimeout(() => {
        this.throwArrow();
      }, 150);
    }
  }

  throwArrow() {
    let angle,
        x = this.body.x,
        y = this.body.y;

    switch(this.lastDirection) {
      case GLOBALS.DIRECTIONS.UP:
        angle = 0;
        y += 14;
        x += 28;
        break;
      case GLOBALS.DIRECTIONS.DOWN:
        angle = -180;
        y += 64;
        x += 38;
        break;
      case GLOBALS.DIRECTIONS.LEFT:
        angle = -90;
        y += 44;
        break;
      case GLOBALS.DIRECTIONS.RIGHT:
        angle = +90;
        y += 34;
        x += 64;
        break;
    }

    const arrow = this.game.add.sprite(x, y, 'arrow');
    arrow.angle = angle;

    this.game.physics.arcade.enable(arrow);

    this.arrows.push({object: arrow, direction: this.lastDirection});
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

    this.attacking = false;
    this.receivingAttack = false;

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
    } else if (characterPosition.x <= this.mapBorderThreshold) {
      return GLOBALS.DIRECTIONS.RIGHT;
    } else if (characterPosition.y <= (mapLimits.y - this.mapBorderThreshold)) {
      return GLOBALS.DIRECTIONS.UP;
    } else if (characterPosition.y <= this.mapBorderThreshold) {
      return GLOBALS.DIRECTIONS.DOWN;
    } else {
      return false;
    }
  }

  randomWalk(speed = 100) {
    const intervalTime = Math.floor(Math.random() * 200) + 600;

    this.randomWalkInterval = setInterval(() => {
      const direction = Math.floor(Math.random() * (6 - 1)) + 1;
      const checkMapBorder = this.checkMapBorderProximity();

      this.randomWalkActive = true;

      if(this.playerNear) {
        this.walk(this.playerDirection, speed);
        return;
      }

      if(checkMapBorder) {
        this.walk(checkMapBorder, speed);
        return;
      }

      if(!this.receivingAttack && this.alive) {
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
    }, intervalTime);
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
    if(this.type === GLOBALS.PLAYER && this.attacking) {
      return;
    }

    const timeoutTime = (this.type === GLOBALS.PLAYER) ? 150 : 200;

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
    }, timeoutTime);
  }

  receiveAttack(character) {
    const frame = character.lastFrame || 0,
          direction = this.getDirection(frame);

    let damage = 0;

    if(!this.receivingAttack) {
      this.receivingAttack = true;

      const dexModifier = (character.type === GLOBALS.PLAYER) ? character.dexterity / 5 : 0;
      const bonus = Math.floor(Math.random() * (10 - 1)) + 1;
      const miss = Math.floor(Math.random() * (7 - 1)) + 1 - dexModifier;

      if(character.characterClass === GLOBALS.SWORDSMAN || character.type === GLOBALS.ENEMY) {
        damage = (character.strength * 2) + bonus;
      } else if (character.characterClass === GLOBALS.ARCHER) {
        damage = (character.dexterity * 1.25) + bonus;
      }

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
          if(this.currentHealth <= 0) {
            this.text.text = 'dead!';
          } else {
            this.text.text = damage;
          }
        } else {
          this.text = this.game.add.text(0, 0, damage, GLOBALS.TEXT_STYLES.DAMAGE);
          this.text.anchor.set(0.5);
        }

        if(this.currentHealth <= 0) {
          this.alive = false;

          if(this.currentHealth < 0) {
            this.currentHealth = 0;
          }

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

      if(character.type === GLOBALS.ENEMY) {
        setTimeout(() => {
          character.attacking = false;
        }, 800);
      }

      setTimeout(() => {
        this.text.text = '';
      }, 500);

      setTimeout(() => {
        this.receivingAttack = false;
      }, 300);
    }
  }

  getOppositeDirectionFrame(frame) {
    switch(frame) {
      case 0:
        return 6;
        break;

      case 3:
        return 9;
        break;

      case 6:
        return 0;
        break;

      case 9:
        return 3;
        break;
    }
  }

  checkProximity(character1, character2, threshold, saveDirection) {
    const character1X = character1.body.x,
          character1Y = character1.body.y,
          character2X = character2.body.x,
          character2Y = character2.body.y;

    if(((character1X >= (character2X - threshold)) && (character1X <= (character2X + threshold)))
      && ((character1Y >= (character2Y - threshold)) && (character1Y <= (character2Y + threshold)))) {
      if(saveDirection) {
        if((character1X >= (character2X - threshold)) && (character1X <= (character2X + threshold))) {
          this.playerDirection = GLOBALS.DIRECTIONS.RIGHT;
        } else if ((character1Y >= (character2Y - threshold)) && (character1Y <= (character2Y + threshold))) {
          this.playerDirection = GLOBALS.DIRECTIONS.UP;
        }
      } else {
        this.playerDirection = null;
      }

      return true;
    } else {
      return false;
    }
  }

  checkPlayerPosition(player) {
    const attackProximity = 32;

    const playerProximity = this.checkProximity(this, player, this.playerProximityTreshold);
    const enemyAttackProximity = this.checkProximity(this, player, attackProximity);

    if(playerProximity) {
      this.playerNear = true;
    } else {
      this.playerNear = false;
    }

    if(enemyAttackProximity) {
      this.lastFrame = (this.getOppositeDirectionFrame(player.lastFrame));
      this.frame = this.lastFrame;
      this.animations.stop();

      if(!this.attacking && player.alive) {
        this.attacking = true;
        player.receiveAttack(this);
      }
    }
  }

  saveCharacterStatus(mapName) {
    const characterId = localStorage.getItem('NWarriorCharID'),
          url = config.apiURL+'characters/updateCharacter/'+characterId,
          data = {
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
        console.log("Character Saved!")
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
