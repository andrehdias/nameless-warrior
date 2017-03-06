import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Map from '../game/Map';
import Dialog from '../game/Dialog';
import Utils from '../core/Utils';

export default class Game extends Phaser.State {
	create() {
    this.debug = false;

		this.game.time.advancedTiming = true;

		this.utils = new Utils();

    this.map = new Map(this.game);

    this.getCharacterInfo();

    this.welcome = new Dialog(
      {
        lines: [
          "Welcome to Nameless Warrior! (Press ENTER to advance)",
          "Use the Arrow Keys to move your character! (Press ENTER to advance)",
          "Use the \"A\" key to attack your enemies(Press ENTER to advance)"
        ]
      },
      () => {
        this.enemies = [];

        for(let i = 0; i < 2; i++) {
          this.enemies.push(new Character(this.game, {characterClass: GLOBALS.SWORDSMAN, health: 100, currentHealth: 100}, GLOBALS.ENEMY))
          this.welcomeDialogFinished = true;
        }
      }
    );

    this.bind()
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

	getCharacterInfo() {
		const characterId = localStorage.getItem('NWarriorCharID'),
          url = config.apiURL+'characters/'+characterId,
          data = {};

		data.token = localStorage.getItem('NWarriorToken');

		$.ajax({
			type: "get",
			url: url,
			data: data,
			success: (data) => {
				data.characterClass = this.utils.formatClass(data.characterClass);
				this.player = new Character(this.game, data);
			}
		});
	}

  bind() {
    $('[name=debug-mode]').change((e) => {
      const checkbox = $(e.currentTarget);

      if(checkbox.is(':checked')) {
        this.debug = true;
      } else {
        this.debug = false;
      }
    })
  }
}
