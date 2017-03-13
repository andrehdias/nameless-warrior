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
		this.game.load.spritesheet('Slime', 'img/enemies/slime.png', 32, 32);
		this.game.load.spritesheet('Mushroom', 'img/enemies/mushroom.png', 32, 32);


    //Maps
    this.game.load.tilemap('Forest_top_left', 'tiles/forest_top_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('Forest_middle_left', 'tiles/forest_middle_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('Forest_bottom_left', 'tiles/forest_bottom_left.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('sprites_background_v2_32x32', 'tiles/sprites_background_v2_32x32.png');
	}

	create() {
    this.getCharacterInfo();
	}

	setLoader() {
		this.loadingStyle = { font: "18px Helvetica", fill: "#fff"},
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", this.loadingStyle);

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
      	data.characterClass = Utils.formatClass(data.characterClass);
		    this.game.state.start('ForestTopLeft', true, false, data);
			}
		});
	}
}
