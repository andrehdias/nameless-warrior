var NWarrior = NWarrior || {};

NWarrior.Map = function(game) {
		this.game = game;

		this.create();
};

NWarrior.Map.prototype = {
	create: function() {
		this.map = this.game.add.tilemap('sampleMap');

	  var game_width = this.map.widthInPixels,
	  		game_height = this.map.heightInPixels;

	  this.game.world.setBounds(0, 0, game_width, game_height);

		this.map.addTilesetImage('TileCraftGroundSet', 'tiles');		

		this.ground = this.map.createLayer("layer1");		
		this.ground.resizeWorld();						
	}
}