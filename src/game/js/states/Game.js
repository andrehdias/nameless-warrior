var NWarrior = NWarrior || {};

NWarrior.Game = function(){};

NWarrior.Game.prototype = {
	create: function() {				
		this.game.time.advancedTiming = true;	

		this.music = this.game.add.audio('backgroundMusic');
		this.music.play('', 0, 1, true);		

		this.player = new NWarrior.Character(this.game);

    this.npc = new NWarrior.Npc(this.game);    

		this.hud = new NWarrior.Hud(this.game);    
		
		this.map = new NWarrior.Map(this.game);    
    
		var audio = this.game.add.sprite(720, 10, 'audio');

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
		this.game.debug.text(this.game.time.fps || '--', 10, 430, "#000"); 
	},

	turnAudio: function(audio) {
		if(this.music.mute == true) {
			this.music.mute = false;
		} else {
			this.music.mute = true;
		}
	}
}