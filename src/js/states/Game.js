import GLOBALS from '../core/Globals';
import config from 'config';
import Character from '../game/Character';
import Utils from '../core/Utils';

export default class Game extends Phaser.State {
	create() {
		this.utils = new Utils();

		this.game.time.advancedTiming = true;

    this.game.stage.backgroundColor = "#333";


    //TODO - Create Maps Class
    this.map = this.game.add.tilemap('forest_dummy');

    const gameWidth = this.map.widthInPixels;
	  const	gameHeight = this.map.heightInPixels;

	  this.game.world.setBounds(0, 0, gameWidth, gameHeight);

    this.map.addTilesetImage('sprites_background_32x32', 'sprites_background_32x32');

    this.groundLayer = this.map.createLayer('Ground');
    this.treesLayer = this.map.createLayer('Trees');
    this.objectsLayer = this.map.createLayer('Objects');

    this.groundLayer.resizeWorld();
    this.treesLayer.resizeWorld();
    this.objectsLayer.resizeWorld();

    this.getCharacterInfo();

    this.enemys = [];

    for(let i = 0; i < 2; i++) {
      this.enemys.push(new Character(this.game, {characterClass: GLOBALS.SWORDSMAN, health: 100, currentHealth: 100}, GLOBALS.ENEMY))
    }
	}

	update() {
    this.game.physics.arcade.collide(this.player, this.enemys, this.collisionHandler);
	}

  collisionHandler(player, enemy) {
    if(player.attacking) {
      enemy.receiveAttack(player);
    }
  }

	render() {
		this.game.debug.text(this.game.time.fps || '--', 10, 20, "#fff");
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
