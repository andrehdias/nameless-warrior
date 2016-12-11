import config from 'config';
import Character from '../game/Character';
import Utils from '../core/Utils';

export default class Game extends Phaser.State {
	create() {		
		this.utils = new Utils();

		this.game.time.advancedTiming = true;

    this.game.stage.backgroundColor = "#333";		

    this.getCharacterInfo();
	}

	update() {

	}

	render() {
		this.game.debug.text(this.game.time.fps || '--', 10, 10, "#fff");
	}

	getCharacterInfo() {
		let characterId = localStorage.getItem('NWarriorCharID'),
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
