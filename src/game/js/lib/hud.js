var NWarrior = NWarrior || {};

NWarrior.Hud = function(game){
	this.game = game;
	this.create();
};

NWarrior.Hud.prototype = {
	create: function() {
    var hpConfig = {
      x: 140,
      y: 30,
      height: 20,
      bar: {
        color: '#940000'
      },
      bg: {
        color: '#000000'
      }
    },

    manaConfig = {
      x: 140,
      y: 60,
      height: 20,
      bar: {
        color: '#5368EE'
      },
      bg: {
        color: '#000000'
      }
    };

    this.healthBar = new HealthBar(this.game, hpConfig);
    this.manaBar = new HealthBar(this.game, manaConfig);
	},

	turnAudio: function(audio) {
		if(this.music.mute == true) {
			this.music.mute = false;
		} else {
			this.music.mute = true;
		}
	}
}
