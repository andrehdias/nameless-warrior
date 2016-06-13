var NWarrior = NWarrior || {};

NWarrior.Hud = function(game){
	this.game = game;
	this.init();
};

NWarrior.Hud.prototype = {
	init: function() {
		this.showHUD();
	},

	showHUD: function() {		     
    var style = { font: "18px Helvetica", fill: "#fff", tabs: 60 };

    var text = this.game.add.text(10, 10, "Vida:\tMana:", style),
				text2 = this.game.add.text(10, 30, "100\t50", style);

		text.fixedToCamera = true;
		text2.fixedToCamera = true;				

		var settings = this.game.add.sprite(760, 10, 'settings');
		settings.fixedToCamera = true;
		settings.scale.setTo(0.7, 0.7);
	}
}