var NWarrior = NWarrior || {};

NWarrior.Npc = function(){};

NWarrior.Npc.prototype = {
	init: function(game) {
		this.npc = game.add.sprite(450, 150, 'npc');
    game.physics.arcade.enable(this.npc);            
    this.npc.body.collideWorldBounds = true;    
    utils.walkAnimations(this.npc);    
    this.npc.frame = 4;
    this.npc.enableBody = true;
    this.npc.body.immovable = true;

    this.walk(this.npc);
    
    return this.npc;
	},

	walk: function(npc) {
		setInterval(function() {
			var direction = Math.floor(Math.random() * (6 - 1)) + 1;			
			
			switch(direction){
				case 1:
					this.lastFrame = 1;
					npc.body.velocity.y = 50;
			    npc.body.velocity.x = 0;
			    npc.animations.play('down');    
					break;

				case 2:
					this.lastFrame = 10;
		      npc.body.velocity.y = -50;
		      npc.body.velocity.x = 0;
		      npc.animations.play('up');
					break;

				case 3:				
					this.lastFrame = 4;
					npc.body.velocity.x = -50;
		      npc.body.velocity.y = 0;
		      npc.animations.play('left');
					break;

				case 4:
					this.lastFrame = 7;
					npc.body.velocity.y = 0;
		      npc.body.velocity.x = 50;
		      npc.animations.play('right');
					break;
				case 5:
					npc.body.velocity.x = 0;
		  		npc.body.velocity.y = 0;
	      	npc.animations.stop();
	      	npc.frame = this.lastFrame;    
					break;
			}
		}, 1000);
	}
}