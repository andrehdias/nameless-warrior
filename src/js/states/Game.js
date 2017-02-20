import config from 'config';
import Character from '../game/Character';
import Utils from '../core/Utils';

export default class Game extends Phaser.State {
	create() {
		this.utils = new Utils();

		this.game.time.advancedTiming = true;

    this.game.stage.backgroundColor = "#333";


    //TO DO - Create Maps Class
    this.map = this.game.add.tilemap('forest_dummy');

    const game_width = this.map.widthInPixels,
	  const	game_height = this.map.heightInPixels;

	  this.game.world.setBounds(0, 0, game_width, game_height);

    this.map.addTilesetImage('sprites_background_64x64', 'sprites_background_64x64');

    this.groundLayer = this.map.createLayer('Ground');
    this.treesLayer = this.map.createLayer('Trees');
    this.objectsLayer = this.map.createLayer('Objects');

    this.groundLayer.resizeWorld();


    this.getCharacterInfo();
	}

	update() {

	}

	render() {
		this.game.debug.text(this.game.time.fps || '--', 10, 50, "#fff");
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
