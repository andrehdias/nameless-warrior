var NWarrior = NWarrior || {};

NWarrior.Game = function(){};

NWarrior.Game.prototype = {
	preload: function() {
		this.game.load.spritesheet('player', 'img/char2.png', 31, 32);			
		this.game.load.spritesheet('npc', 'img/char3.png', 31, 32);			
		this.game.load.tilemap('sampleMap', 'tiles/sample_map.json', null, Phaser.Tilemap.TILED_JSON);	
		this.game.load.image('tiles', 'tiles/RPGpack_sheet.png');
		this.game.load.audio('backgroundMusic', 'audio/RetroMystic.ogg');

		//hud
		this.game.load.image('settings', 'img/wrench.png');
		this.game.load.image('audio', 'img/audioOn.png');
	},

	create: function() {				
		this.game.time.advancedTiming = true;		


		this.music = this.game.add.audio('backgroundMusic');
		this.music.play('', 0, 1, true);


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


    this.player = this.game.add.sprite(280, 50, 'player');
    this.player.frame = 1;
    this.game.physics.arcade.enable(this.player);            
    this.player.body.collideWorldBounds = true;    
    utils.walkAnimations(this.player);
    this.game.camera.follow(this.player);

    this.npcClass = new NWarrior.Npc();
    this.npc = this.npcClass.init(this.game);	 	

		this.hud = new NWarrior.Hud(this.game);    
    
		var audio = this.game.add.sprite(730, 10, 'audio');

    audio.fixedToCamera = true;
		audio.scale.setTo(0.7, 0.7);		

		audio.inputEnabled = true;
		audio.events.onInputDown.add(this.turnAudio, this);		
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npc);

		this.player.body.velocity.x = 0;

		this.cursors = this.game.input.keyboard.createCursorKeys();

	 	utils.walkCursors(this.cursors, this.player);			  	

	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 580, "#000"); 
	},

	showMessage: function() {
		console.log("olá forasteiro!");
	},

	turnAudio: function(audio) {
		if(this.music.mute == true) {
			this.music.mute = false;
		} else {
			this.music.mute = true;
		}
	}
}