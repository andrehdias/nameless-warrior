import BootState from '../states/Boot';
import GameState from '../states/Game';

export default class Game {
	constructor() {
		if(!localStorage.getItem('NWarriorToken')) {
			window.location.assign('/');
		}

		$('.content').addClass('hide');		
		$('.game__wrapper').removeClass('hide');

		this.gameWidth = 980;
   	this.gameHeight = 502;

		this.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, 'phaser');

		this.game.state.add('Boot', BootState);
		this.game.state.add('Game', GameState);					

		this.game.state.start('Boot');		

		this.uiStyle();		
	}

	uiStyle() {
		$('.ui-style').each(function() {
			$(this).append('<div class="ui-style__left-border"></div><div class="ui-style__right-border"></div><div class="ui-style__top-border"></div><div class="ui-style__bottom-border"></div><div class="ui-style__top-left-corner"></div><div class="ui-style__top-right-corner"></div><div class="ui-style__bottom-left-corner"></div><div class="ui-style__bottom-right-corner"></div>');
		});
	}	
}
