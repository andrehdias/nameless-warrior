import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Map from '../game/Map';
import Dialog from '../game/Dialog';
import Utils from '../core/Utils';

export default class Game extends Phaser.State {
	create() {
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
        this.enemys = [];

        for(let i = 0; i < 2; i++) {
          this.enemys.push(new Character(this.game, {characterClass: GLOBALS.SWORDSMAN, health: 100, currentHealth: 100}, GLOBALS.ENEMY))
          this.welcomeDialogFinished = true;
        }
      }
    );
	}

	update() {
    if(this.welcomeDialogFinished) {
      this.game.physics.arcade.collide(this.player, this.enemys, this.collisionHandler);
    }
	}

	render() {
		this.game.debug.text(this.game.time.fps || '--', 10, 20, "#fff");
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
}
