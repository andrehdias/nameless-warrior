var NWarrior = NWarrior || {};

NWarrior.Game = function(){};

NWarrior.Game.prototype = {
	preload: function() {
		this.game.load.spritesheet('player', 'img/char.png', 29, 32);			
		this.game.load.tilemap('sampleMap', 'tiles/sample_map.json', null, Phaser.Tilemap.TILED_JSON);	
		this.game.load.image('tiles', 'tiles/RPGpack_sheet.png');
	},

	create: function() {				
		this.game.time.advancedTiming = true;

		this.game.stage.backgroundColor = '#787878';

		this.map = this.game.add.tilemap('sampleMap');
		
    var game_width = this.map.widthInPixels;
    var game_height = this.map.heightInPixels;

    this.game.world.setBounds(0, 0, game_width, game_height);

		this.map.addTilesetImage('RPGpack_sheet', 'tiles');


		this.ground = this.map.createLayer("ground");		
		this.ground.resizeWorld();
		this.water = this.map.createLayer("water");
		this.water.resizeWorld();
		this.object = this.map.createLayer("object");		                   
		this.object.resizeWorld();
		

    this.player = this.game.add.sprite(200, 50, 'player');
    this.game.physics.arcade.enable(this.player);            
    this.player.body.collideWorldBounds = true;    
    utils.walkAnimations(this.player);
    this.game.camera.follow(this.player);

	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.water);

		this.player.body.velocity.x = 0;

		this.cursors = this.game.input.keyboard.createCursorKeys();

	 	utils.walkCursors(this.cursors, this.player);			  	 	
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000"); 
	}
}