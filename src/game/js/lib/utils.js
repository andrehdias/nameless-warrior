var utils = {
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
  },

  walkCursors: function (cursor, player, speed) {    
    speed = speed || 150;

		if (cursor.left.isDown) {
      this.walk('left', player, speed);
    } else if (cursor.right.isDown) {      
      this.walk('right', player, speed);
	  } else if (cursor.up.isDown) {
      this.walk('up', player, speed);
	  } else if (cursor.down.isDown) {
      this.walk('down', player, speed);
	  } else {
	  	this.walk('stop', player, speed);
	  }  	    
  },
  
  randomWalk: function(character, speed) {
    var _this = this,
        speed = speed || 150;

    setInterval(function() {
      var direction = Math.floor(Math.random() * (6 - 1)) + 1;      
      
      switch(direction){
        case 1:
          _this.walk('down', character, speed);
          break;

        case 2:
          _this.walk('up', character, speed);
          break;

        case 3:       
          _this.walk('left', character, speed);
          break;

        case 4:
          _this.walk('right', character, speed);
          break;

        case 5:
          _this.walk('stop', character, speed);
          break;
      }
    }, 1000);
  }
};