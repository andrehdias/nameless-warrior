var NWarrior = NWarrior || {};

NWarrior.Hud = function(game){
	this.game = game;
	this.create();
};

NWarrior.Hud.prototype = {
	create: function() {
    var style = { font: "18px Helvetica", fill: "#fff", tabs: 60 };
				text = this.game.add.text(10, 10, "Vida:\tMana:", style),
				text2 = this.game.add.text(10, 30, "100\t50", style);

		text.fixedToCamera = true;
		text2.fixedToCamera = true;

		/*this.music = this.game.add.audio('backgroundMusic');
		this.music.play('', 0, 1, true);*/

		var audio = this.game.add.sprite(720, 10, 'audio');

    audio.fixedToCamera = true;
		audio.scale.setTo(0.7, 0.7);		

		audio.inputEnabled = true;
		audio.events.onInputDown.add(this.turnAudio, this);		
	},

	turnAudio: function(audio) {
		if(this.music.mute == true) {
			this.music.mute = false;
		} else {
			this.music.mute = true;
		}
	}
}