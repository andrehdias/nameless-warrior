NWarrior.Boot = function() {};

NWarrior.Boot.prototype = {
	preload: function() {		
		this.game.load.spritesheet('Warrior', 'img/classes/swordman_walk.png', 32, 32);			
		this.game.load.spritesheet('Archer', 'img/classes/archer_walk.png', 32, 32);			
		this.game.load.spritesheet('Mage', 'img/classes/mage_walk.png', 32, 32);			
		this.game.load.tilemap('sampleMap', 'tiles/sample_map3.json', null, Phaser.Tilemap.TILED_JSON);	
		this.game.load.image('tiles', 'tiles/RPGpack_sheet.png');
	},

	create: function() {
		NWarrior.game.state.start('Game');
	},

	setLoader: function() {
		this.loadingStyle = { font: "18px Helvetica", fill: "#fff"},
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", this.loadingStyle);
		
		this.loading.anchor.setTo(0.5);
	}
}