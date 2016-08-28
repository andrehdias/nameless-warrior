NWarrior.Boot = function() {};

NWarrior.Boot.prototype = {
	preload: function() {
		this.loadingStyle = { font: "18px Helvetica", fill: "#fff"},
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Carregando...", this.loadingStyle);
		
		this.loading.anchor.setTo(0.5);

		this.game.load.spritesheet('player', 'img/char2.png', 31, 32);			
		this.game.load.spritesheet('npc', 'img/char3.png', 31, 32);			
		this.game.load.tilemap('sampleMap', 'tiles/sample_map3.json', null, Phaser.Tilemap.TILED_JSON);	
		this.game.load.image('tiles', 'tiles/RPGpack_sheet.png');
		this.game.load.audio('backgroundMusic', 'audio/RetroMystic.ogg');

		//hud
		this.game.load.image('settings', 'img/wrench.png');
		this.game.load.image('audio', 'img/audioOn.png');
	},

	create: function() {
		NWarrior.game.state.start('Game');
	}
}