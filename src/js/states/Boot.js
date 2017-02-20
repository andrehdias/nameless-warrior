export default class Boot extends Phaser.State {
	preload() {
		this.game.load.spritesheet('SwordsMan', 'img/classes/swordman_walk.png', 32, 32);
		this.game.load.spritesheet('SwordsMan_attack', 'img/classes/swordman_attack.png', 64, 64);
		this.game.load.spritesheet('SwordsMan_sleep', 'img/classes/swordman_sleep.png', 32, 32);
		this.game.load.spritesheet('SwordsMan_dead', 'img/classes/swordman_dead.png', 32, 32);

		this.game.load.spritesheet('Archer', 'img/classes/archer_walk.png', 32, 32);
		this.game.load.spritesheet('Archer_attack', 'img/classes/archer_attack.png', 64, 64);
		this.game.load.spritesheet('Archer_sleep', 'img/classes/archer_sleep.png', 32, 32);
		this.game.load.spritesheet('Archer_dead', 'img/classes/archer_dead.png', 32, 32);

		this.game.load.spritesheet('Mage', 'img/classes/mage_walk.png', 32, 32);
		this.game.load.spritesheet('Mage_attack', 'img/classes/mage_attack.png', 64, 64);
		this.game.load.spritesheet('Mage_sleep', 'img/classes/mage_sleep.png', 32, 32);
		this.game.load.spritesheet('Mage_dead', 'img/classes/mage_dead.png', 32, 32);

    this.game.load.tilemap('forest_dummy', 'tiles/forest_dummy.json');
    this.game.load.image('sprites_background_64x64', 'tiles/sprites_background_64x64.png');
	}

	create() {
		this.game.state.start('Game');
	}

	setLoader() {
		this.loadingStyle = { font: "18px Helvetica", fill: "#fff"},
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", this.loadingStyle);

		this.loading.anchor.setTo(0.5);
	}
}
