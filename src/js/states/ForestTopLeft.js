import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Map from '../game/Map';
import Dialog from '../game/Dialog';

export default class ForestTopLeft extends Phaser.State {
  init(characterData) {
    this.characterData = characterData;

    console.log(characterData)
  }

	create() {
    this.debug = false;

		this.game.time.advancedTiming = true;

    this.map = new Map(this.game, {map: 'Forest_top_left'});

    this.player = new Character(this.game, this.characterData, GLOBALS.PLAYER, 300, 300);
    this.enemies = [];

    this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.SLIME, health: 70, currentHealth: 70}, GLOBALS.ENEMY, 450, 450))
    this.enemies.push(new Character(this.game, {characterClass: GLOBALS.ENEMIES.MUSHROOM, health: 70, currentHealth: 70}, GLOBALS.ENEMY, 150, 150))

    this.map.renderLastLayer();

    this.welcome = new Dialog(
      {
        lines: [
          "Welcome to Nameless Warrior! (Press ENTER to advance)",
          "Use the Arrow Keys to move your character! (Press ENTER to advance)",
          "Use the \"A\" key to attack your enemies(Press ENTER to advance)"
        ]
      },
      () => {
        this.welcomeDialogFinished = true;
      }
    );

    this.bind()

    // setTimeout(() => {
    //   this.game.state.start('ForestMiddleLeft', true, false, this.characterData);
    // }, 3000);
	}

	update() {
    if(this.welcomeDialogFinished) {
      this.game.physics.arcade.collide(this.player, this.enemies, this.collisionHandler);
    }

    if(this.player) {
      this.game.physics.arcade.collide(this.player, this.map.collideLayer);
    }

    if(this.enemies) {
      for (var key in this.enemies) {
        if(this.enemies[key].alive) {
          this.game.physics.arcade.collide(this.enemies[key], this.map.collideLayer);

          this.enemies[key].checkPlayerPosition(this.player);
        }
      }
    }
	}

	render() {
    if(this.debug) {
      this.game.debug.text(this.game.time.fps || '--', 10, 20, "#fff");

      if(this.player && this.debug) {
          this.game.debug.bodyInfo(this.player, 32, 32);
          this.game.debug.body(this.player);
      }

      if(this.enemies && this.debug) {
        for (var key in this.enemies) {
          const enemy = this.enemies[key];

          this.game.debug.body(enemy);
        }
      }
    }
	}

  collisionHandler(player, enemy) {
    if(player.attacking) {
      enemy.receiveAttack(player);
    }
  }

  bind() {
    $('[name=debug-mode]').change((e) => {
      const checkbox = $(e.currentTarget);

      if(checkbox.is(':checked')) {
        this.debug = true;
      } else {
        this.debug = false;
      }
    });
  }
}
