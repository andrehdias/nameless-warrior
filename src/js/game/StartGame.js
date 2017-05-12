import * as states from '../states';

export default class StartGame {
	constructor() {
		const sizes = { w: 980, h: 470 };

		if(!localStorage.getItem('NWarriorToken')) {
			window.location.assign('/');
		}

		this.game = new Phaser.Game(sizes.w, sizes.h, Phaser.AUTO, 'phaser', null, false, false);

		Object.keys(states).forEach(state => this.game.state.add(state, states[state]));

		this.game.state.start('Boot');

		this.uiStyle();
	}

	uiStyle() {
		$('.ui-style').each(function() {
			$(this).append('<div class="ui-style__left-border"></div><div class="ui-style__right-border"></div><div class="ui-style__top-border"></div><div class="ui-style__bottom-border"></div><div class="ui-style__top-left-corner"></div><div class="ui-style__top-right-corner"></div><div class="ui-style__bottom-left-corner"></div><div class="ui-style__bottom-right-corner"></div>');
		});
	}
}
