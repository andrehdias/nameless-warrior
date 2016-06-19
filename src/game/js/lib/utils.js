var utils = {
    walkCursors: function (cursor, player) {    
		if (cursor.left.isDown) {
      this.walk('left', player, 150);
    } else if (cursor.right.isDown) {      
      this.walk('right', player, 150);
	  } else if (cursor.up.isDown) {
      this.walk('up', player, 150);
	  } else if (cursor.down.isDown) {
      this.walk('down', player, 150);
	  } else {
	  	this.walk('stop', player, 150);
	  }  	    
  },

  walkAnimations: function (player) {
  	player.animations.add('down', [1, 0, 2], 10, true);
  	player.animations.add('left', [4, 3, 5], 10, true);
  	player.animations.add('right', [7, 6, 8], 10, true);
  	player.animations.add('up', [10, 9, 11], 10, true);  
  },

  walk: function(direction, character, velocity) {
    velocity = velocity || 50;

    switch(direction){
      case 'down':
        this.lastFrame = 1;
        character.body.velocity.y = velocity;
        character.body.velocity.x = 0;
        break;

      case 'up':
        this.lastFrame = 10;
        character.body.velocity.y = -velocity;
        character.body.velocity.x = 0;
        break;

      case 'left':       
        this.lastFrame = 4;
        character.body.velocity.x = -velocity;
        character.body.velocity.y = 0;
        break;

      case 'right':
        this.lastFrame = 7;
        character.body.velocity.y = 0;
        character.body.velocity.x = velocity;
        break;
        
      case 'stop':
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.animations.stop();
        break;      
    }

    character.animations.play(direction);    
  }
};