import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Map from '../game/Map';
import Dialog from '../game/Dialog';

export default class MapState extends Phaser.State {
  init(options) {
    this.player = null;

    $(window).unbind('keydown');

    if(!this.isCity) {
      this.enemies = [];
    }

    this.options = options;

    this.$overlay = $('.game__wrapper__overlay');
    this.$overlay.removeClass('active');

    this.$saveBtn = $('.game-menu__save-btn');
    this.$autoSaveCheckbox = $('.game__option--autosave');
    this.autoSave = localStorage.getItem('NWarriorAutoSave');

    if(this.autoSave) {
      this.$autoSaveCheckbox.prop('checked', true);
    }

    if(!this.options.previousMap) {
      this.shouldChangeMap = true;
    } else {
      this.shouldChangeMap = false;
    }

    this.playerPositionThreshold = 32;
  }

  create() {
    this.debug = false;

		this.game.time.advancedTiming = true;

    this.map = new Map(this.game, {map: this.mapName, isHouse: this.isHouse, isCity: this.isCity});

    this.playerPosition = this.getPlayerPosition();
    this.playerFirstPosition = this.playerPosition;

    this.player = new Character(this.game, this.options.characterData, GLOBALS.PLAYER, this.playerPosition.x, this.playerPosition.y, this.map);

    if(this.options.previousMap) {
      this.player.turnSprite(this.playerInitialDirection);
    }

    if(!this.isCity) {
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.SLIME, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 450, 450, this.map));
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.MUSHROOM, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 150, 150, this.map));
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.SLIME, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 450, 950, this.map));
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.MUSHROOM, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 550, 350, this.map));
    }

    this.map.renderLastLayer();

    this.addMapTransitions();

    this.bind();
  }

	update() {
    if(!this.isCity) {
      if(this.player.characterClass === GLOBALS.ARCHER) {
        for (let arrow in this.player.arrows) {
          if(this.player.arrows[arrow] !== null) {
            this.game.physics.arcade.collide(this.player.arrows[arrow].object, this.enemies, (player, enemy) => {
              player = (player.key === "arrow") ? this.player : player;

              this.player.arrows[arrow].object.destroy();
              this.player.arrows[arrow].destroyed = true;

              this.collisionHandler(player, enemy);
            });
          }
        }
      } else {
        this.game.physics.arcade.collide(this.player, this.enemies, this.collisionHandler);
      }
    }

    if(this.options.previousMap) {
      this.checkShouldChangeMap();
    }

    if(this.player) {
      this.game.physics.arcade.collide(this.player, this.map.collideLayer);
      this.game.physics.arcade.collide(this.player, this.map.groundLayer);
    }

    if(this.enemies) {
      for (let key in this.enemies) {
        if(this.enemies[key].alive) {
          this.game.physics.arcade.collide(this.enemies[key], this.map.collideLayer);

          this.enemies[key].checkPlayerPosition(this.player);
        }
      }
    }

    if(!this.deadDialog && !this.player.alive) {
      this.$overlay.addClass('active');

      if(this.enemies) {
        for (let key in this.enemies) {
          clearInterval(this.enemies[key].randomWalkInterval);
          this.enemies[key].kill();
        }
      }

      this.deadDialog = new Dialog(
        {
          lines: [
            "You are dead! Like everything else in your life, you have failed!"
          ]
        },
        () => {
          this.player.currentHealth = this.player.health;
          this.player.saveCharacterStatus();


          setTimeout(() => {
            this.changeMap('UselessCity', GLOBALS.DIRECTIONS.DOWN);
          }, 1000);
        }
      );
    }
	}

	render() {
    this.game.debug.text('fps: '+this.game.time.fps || '--', 35, 20, "#fff");

    if(this.player && this.debug) {
        this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
    }

    if(this.enemies && this.debug) {
      for (let key in this.enemies) {
        const enemy = this.enemies[key];

        this.game.debug.body(enemy);
      }
    }
	}

  getPlayerPosition() {
    if(this.options.previousMap) {
      let initialPosition = 0;

      if(this.options.firstPositionThreshold) {
        initialPosition += this.options.firstPositionThreshold;
      }

      switch(this.options.enterPosition) {
        case GLOBALS.DIRECTIONS.UP:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.UP;
          return {x: this.options.playerLastPosition.x + 16, y: initialPosition}

          break;

        case GLOBALS.DIRECTIONS.DOWN:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.DOWN;
          return {x: this.options.playerLastPosition.x + 16, y: this.map.tilemap.heightInPixels - 32 + initialPosition}

          break;

        case GLOBALS.DIRECTIONS.LEFT:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.RIGHT;
          return {x: initialPosition, y: this.options.playerLastPosition.y + 16}

          break;

        case GLOBALS.DIRECTIONS.RIGHT:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.LEFT;
          return {x: this.map.tilemap.widthInPixels - 32 + initialPosition, y: this.options.playerLastPosition.y + 16}

          break;
      }
    } else {
      if(this.options.characterData.lastPositionX !== 0) {
        return {x: this.options.characterData.lastPositionX - 32, y: this.options.characterData.lastPositionY};
      } else {
        return {x: 300, y: 300};
      }
    }
  }

  collisionHandler(player, enemy) {
    if(player.attacking || player.characterClass === GLOBALS.ARCHER) {
      enemy.receiveAttack(player);
    }
  }

  bind() {
    this.saveLocationInterval = setInterval(() => {
      if(this.autoSave) {
        this.player.saveCharacterStatus(this.mapName);
      }
    }, 10000);

    this.$saveBtn.click(() => {
      this.player.saveCharacterStatus(this.mapName);
    });

    this.$autoSaveCheckbox.change((e) => {
      if(this.$autoSaveCheckbox.is(':checked')) {
        this.autoSave = true;
        localStorage.setItem('NWarriorAutoSave', true);
      } else {
        this.autoSave = false;
        localStorage.setItem('NWarriorAutoSave', false);
      }
    })
  }

  checkShouldChangeMap() {
    const playerCurrentPosition = {
      x: this.player.body.x,
      y: this.player.body.y
    }

    switch(this.options.enterPosition) {
      case GLOBALS.DIRECTIONS.UP:
        if((this.playerFirstPosition.y + this.playerPositionThreshold) <= playerCurrentPosition.y) {
          this.shouldChangeMap = true;
        }

        break;

      case GLOBALS.DIRECTIONS.DOWN:
        if((this.playerFirstPosition.y - this.playerPositionThreshold) >= playerCurrentPosition.y) {
          this.shouldChangeMap = true;
        }

        break;

      case GLOBALS.DIRECTIONS.LEFT:
        if((this.playerFirstPosition.x + this.playerPositionThreshold) <= playerCurrentPosition.x) {
          this.shouldChangeMap = true;
        }

        break;

      case GLOBALS.DIRECTIONS.RIGHT:
        if((this.playerFirstPosition.x - this.playerPositionThreshold) >= playerCurrentPosition.x) {
          this.shouldChangeMap = true;
        }

        break;
    }
  }

  addMapTransitions() {
    this.willChangeMap = false;
  }

  changeMap(state, enterPosition, threshold) {
    if(!this.shouldChangeMap) {return;}

    clearInterval(this.saveLocationInterval);
    clearInterval(this.saveStatusInterval);

    for (let key in this.enemies) {
      clearInterval(this.enemies[key].randomWalkInterval);
    }

    const playerCurrentPosition = {
      x: this.player.body.x,
      y: this.player.body.y
    }

    if(!this.willChangeMap) {
      this.willChangeMap = true;

      const options = {
        characterData: this.options.characterData,
        previousMap: this.mapName,
        enterPosition: enterPosition,
        playerLastPosition: playerCurrentPosition,
        firstPositionThreshold: threshold
      }

      setTimeout(() => {
        this.game.state.start(state, true, false, options);
      }, 100);
    }
  }
}
