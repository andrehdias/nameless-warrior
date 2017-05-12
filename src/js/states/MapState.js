import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Map from '../game/Map';
import Dialog from '../game/Dialog';
import Utils from '../core/Utils';

export default class MapState extends Phaser.State {
  init(options) {
    this.player = null;

    this.game.stage.smoothing = false;

    $(window).unbind('keydown');

    if(!this.isCity) {
      this.enemies = [];

      this.music = this.game.add.audio(GLOBALS.MUSICS.SAD_DESCENT);
      this.music.loop = true;
    } else {
      this.music = this.game.add.audio(GLOBALS.MUSICS.SAD_TOWN);
      this.music.loop = true;
    }

    this.options = options;

    this.$overlayDead = $('.game__wrapper__overlay--grey');
    this.$overlayDead.removeClass('active');

    this.$saveText = $('.game-menu__message');

    this.$saveBtn = $('.game-menu__save-btn');
    this.$autoSaveCheckbox = $('.game__option--autosave');
    this.autoSave = (localStorage.getItem('NWarriorAutoSave') === 'true');

    this.musicOn = (localStorage.getItem('NWarriorMusicOn') === 'true');
    this.$musicCheckbox = $('.game__option--music');

    this.deadDialog = false;

    if(this.autoSave) {
      this.$autoSaveCheckbox.prop('checked', true);
    }

    if(this.musicOn) {
      this.$musicCheckbox.prop('checked', true);

      if(this.music) {
        this.music.volume = 0.3;
        this.music.play();
      }
    } else {
      this.$musicCheckbox.prop('checked', false);
    }

    this.shouldChangeMap = true;

    this.playerPositionThreshold = 32;

    this.$gameTimeHours = $('.game__time-hours');
    this.$gameTimeMinutes = $('.game__time-minutes');
    this.$gameTimeType = $('.game__time-type');
    this.$overlayNight = $('.game__wrapper__overlay--night');
  }

  create() {
    this.debug = false;

		this.game.time.advancedTiming = true;

    this.map = new Map(this.game, {map: this.mapName, isHouse: this.isHouse, isCity: this.isCity});

    this.playerPosition = this.getPlayerPosition();

    this.playerFirstPosition = this.playerPosition;

    this.player = new Character(this.game, this.options.characterData, GLOBALS.PLAYER, this.playerPosition.x, this.playerPosition.y, this.map);

    this.handleTime();

    if(this.options.previousMap) {
      this.player.turnSprite(this.playerInitialDirection);
    }

    if(!this.isCity) {
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.SLIME, isHostile: true, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 450, 450, this.map));
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.MUSHROOM, isHostile: true, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 150, 150, this.map));
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.SLIME, isHostile: true, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 450, 950, this.map));
      this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.MUSHROOM, isHostile: true, health: 70, currentHealth: 70, strength: 5, dexterity: 5}, GLOBALS.ENEMY, 550, 350, this.map));
    }

    this.map.renderLastLayer();

    this.addMapTransitions();

    this.bind();

    if(!this.player.firstDialog) {
      this.welcome = new Dialog(
        {
          lines: [
            "Welcome to the ruthless, desolated and cute world of <strong>Nameless Warrior Beta</strong>!",
            "If you have any suggestions or want to report any bug, please send me an email :D (andresan2006@gmail.com)",
            "Go to the <strong>Status</strong> menu to see your character status. Go to <strong>Help</strong> to see the keyboard controls and the description of the status"
          ]
        },
        () => {
          this.player.firstDialog = true;
        }
      );
    }
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
      this.$overlayDead.addClass('active');

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
          this.player.saveCharacterStatus(this.mapName, () => {
            setTimeout(() => {
              this.changeMap('UselessCity', GLOBALS.DIRECTIONS.DOWN);
            }, 1000);
          });
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
      let initialPosition = 0,
          position;

      if(this.options.firstPositionThreshold) {
        initialPosition += this.options.firstPositionThreshold;
      }

      switch(this.options.enterDirection) {
        case GLOBALS.DIRECTIONS.UP:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.UP;
          position = {x: this.options.playerLastPosition.x + 16, y: initialPosition}

          break;

        case GLOBALS.DIRECTIONS.DOWN:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.DOWN;
          position =  {x: this.options.playerLastPosition.x + 16, y: this.map.tilemap.heightInPixels - initialPosition}

          break;

        case GLOBALS.DIRECTIONS.LEFT:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.RIGHT;
          position = {x: initialPosition, y: this.options.playerLastPosition.y + 16}

          break;

        case GLOBALS.DIRECTIONS.RIGHT:
          this.playerInitialDirection = GLOBALS.DIRECTIONS.LEFT;
          position = {x: this.map.tilemap.widthInPixels - initialPosition, y: this.options.playerLastPosition.y + 16}

          break;
      }

      if(this.options.enterPosition) {
        return this.options.enterPosition;
      } else {
        return position;
      }
    } else {
      if(this.options.characterData.lastPositionX !== 0) {
        return {x: this.options.characterData.lastPositionX, y: this.options.characterData.lastPositionY};
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
        this.player.saveCharacterStatus(this.mapName, () => {
          this.$saveText.removeClass('hide');

          setTimeout(() => {
            this.$saveText.addClass('hide');
          }, 3000);
        });
      }
    }, 10000);

    this.$saveBtn.click(() => {
      this.player.saveCharacterStatus(this.mapName, () => {
        this.$saveText.removeClass('hide');

        setTimeout(() => {
          this.$saveText.addClass('hide');
        }, 3000);
      });
    });

    this.$autoSaveCheckbox.change((e) => {
      if(this.$autoSaveCheckbox.is(':checked')) {
        this.autoSave = true;
        localStorage.setItem('NWarriorAutoSave', true);
      } else {
        this.autoSave = false;
        localStorage.setItem('NWarriorAutoSave', false);
      }
    });

    this.$musicCheckbox.change((e) => {
      if(this.$musicCheckbox.is(':checked')) {
        this.musicOn = true;
        localStorage.setItem('NWarriorMusicOn', true);

        if(this.music) {
          this.music.play();
        }
      } else {
        this.musicOn = false
        localStorage.setItem('NWarriorMusicOn', false);

        if(this.music) {
          this.music.stop();
        }
      }
    });

    this.timeInverval = setInterval(() => {
      this.handleTime();
    }, 5000);
  }

  addMapTransitions() {
    this.willChangeMap = false;
  }

  changeMap(state, enterDirection, threshold, enterPosition) {
    if(!this.shouldChangeMap) {return;}

    this.shouldChangeMap = false;
    this.autoSave = false;

    this.player.saveCharacterStatus(this.mapName, () => {
      if(this.music) {
        this.music.stop();
        this.music = null;
      }

      clearInterval(this.saveStatusInterval);
      clearInterval(this.timeInverval);

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
          previousMapMusic: this.music,
          enterDirection: enterDirection,
          enterPosition: enterPosition,
          playerLastPosition: playerCurrentPosition,
          firstPositionThreshold: threshold
        }

        setTimeout(() => {
          this.game.state.start(state, true, false, options);
        }, 100);
      }
    });
  }

  handleTime() {
    const hours = Utils.addZero(this.player.gameTimeHours),
          minutes = Utils.addZero(this.player.gameTimeMinutes),
          date = new Date();

    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);

    date.setUTCMinutes(date.getUTCMinutes() + 5);

    this.player.gameTimeHours = Utils.addZero(date.getUTCHours());
    this.player.gameTimeMinutes = Utils.addZero(date.getUTCMinutes());

    this.$gameTimeHours.html(this.player.gameTimeHours);
    this.$gameTimeMinutes.html(this.player.gameTimeMinutes);
    this.$gameTimeType.html((this.player.gameTimeHours >= 12) ? 'PM' : 'AM');

    this.setNightOverlay(this.player.gameTimeHours);
  }

  setNightOverlay(hours) {
    if(hours >= 19 || hours <= 6) {
      this.$overlayNight.addClass('active');

      let opacity;

      if(!this.isHouse) {
        if(hours >= 19 && hours <= 21) {
          this.$overlayNight.css('opacity', 0.45);
        } else if ((hours == 22 || hours == 23) || (hours >= 0 && hours <= 4)) {
          this.$overlayNight.css('opacity', 0.55);
        } else if (hours == 5 || hours == 6) {
          this.$overlayNight.css('opacity', 0.35);
        }
      }
    } else {
      this.$overlayNight.removeClass('active');
    }
  }
}
