var NWarrior = NWarrior || {};

NWarrior.Hud = function(){};

NWarrior.Hud.prototype = {
	showHUD: function(game, gameAudio) {		     
    var style = { font: "18px Helvetica", fill: "#fff", tabs: 60 };

    var text = game.add.text(10, 10, "Vida:\tMana:", style),
				text2 = game.add.text(10, 30, "100\t50", style);

		text.fixedToCamera = true;
		text2.fixedToCamera = true;				
	}
}