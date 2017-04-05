import GLOBALS from '../core/Globals';
import Utils from '../core/Utils';
import config from 'config';

export default class Boot extends Phaser.State {
	preload() {
    this.setLoader();

    //Player
		this.game.load.spritesheet('SwordsMan', 'img/classes/swordman_walk.png', 32, 32);
		this.game.load.spritesheet('SwordsMan_attack', 'img/classes/swordman_attack.png', 64, 64);
		this.game.load.spritesheet('SwordsMan_sleep', 'img/classes/swordman_sleep.png', 64, 64);
		this.game.load.spritesheet('SwordsMan_dead', 'img/classes/swordman_dead.png', 64, 64);

		this.game.load.spritesheet('Archer', 'img/classes/archer_walk.png', 32, 32);
		this.game.load.spritesheet('Archer_attack', 'img/classes/archer_attack.png', 64, 64);
		this.game.load.spritesheet('Archer_sleep', 'img/classes/archer_sleep.png', 64, 64);
		this.game.load.spritesheet('Archer_dead', 'img/classes/archer_dead.png', 64, 64);

		this.game.load.spritesheet('Mage', 'img/classes/mage_walk.png', 32, 32);
		this.game.load.spritesheet('Mage_attack', 'img/classes/mage_attack.png', 64, 64);
		this.game.load.spritesheet('Mage_sleep', 'img/classes/mage_sleep.png', 64, 64);
		this.game.load.spritesheet('Mage_dead', 'img/classes/mage_dead.png', 64, 64);


    //Enemies
		this.game.load.spritesheet(GLOBALS.ENEMIES.SLIME, 'img/enemies/slime.png', 32, 32);
		this.game.load.spritesheet(GLOBALS.ENEMIES.MUSHROOM, 'img/enemies/mushroom.png', 32, 32);


    //Maps
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_TOP_LEFT, 'tiles/forest_top_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_TOP_MIDDLE, 'tiles/forest_top_middle.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_TOP_RIGHT, 'tiles/forest_top_right.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_MIDDLE_LEFT, 'tiles/forest_middle_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_MIDDLE_RIGHT, 'tiles/forest_middle_right.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_BOTTOM_LEFT, 'tiles/forest_bottom_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_BOTTOM_MIDDLE, 'tiles/forest_bottom_middle.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.FOREST_BOTTOM_RIGHT, 'tiles/forest_bottom_right.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap(GLOBALS.MAPS.USELESS_CITY, 'tiles/useless_city.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('sprites_background_32x32_v3', 'tiles/sprites_background_32x32_v3.png');
	}

	create() {
    this.getCharacterInfo();
	}

	setLoader() {
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", GLOBALS.TEXT_STYLES.LOADING);

		this.loading.anchor.setTo(0.5);
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
        data.classNumber = data.characterClass;
      	data.characterClass = Utils.formatClass(data.characterClass);

        const map = data.lastMap || 'ForestBottomMiddle';

        const options = {
          characterData: data,
          previousMap: false
        }

		    this.game.state.start(Utils.humanize(map), true, false, options);
			}
		});
	}
}
