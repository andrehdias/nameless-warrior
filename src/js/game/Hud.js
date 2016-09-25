NWarrior.Hud = function(game){
	this.game = game;
	this.create();
};

NWarrior.Hud.prototype = {
	create: function() {
    
	},

	turnAudio: function(audio) {
		if(this.music.mute == true) {
			this.music.mute = false;
		} else {
			this.music.mute = true;
		}
	}
}
