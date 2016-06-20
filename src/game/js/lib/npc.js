var NWarrior = NWarrior || {};

NWarrior.Npc = function(game){
		Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'npc');
		
    game.physics.arcade.enable(this);            

    this.body.collideWorldBounds = true;    

    utils.walkAnimations(npc);    

    this.frame = 4;
    this.enableBody = true;    

    this.walk(this);       
};

NWarrior.Npc.prototype = {
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