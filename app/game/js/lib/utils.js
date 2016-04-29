var utils = {
  centerGameObjects: function (objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    })
  },
  
  walkCursors: function (cursor, player) {    
		if (cursor.left.isDown) {
      this.lastFrame = 4;
      player.body.velocity.x = -150;
      player.body.velocity.y = 0;
      player.animations.play('left');
	  } else if (cursor.right.isDown) {
      this.lastFrame = 7;
      player.body.velocity.y = 0;
      player.body.velocity.x = 150;
      player.animations.play('right');
	  } else if (cursor.up.isDown) {
      this.lastFrame = 10;
      player.body.velocity.y = -150;
      player.body.velocity.x = 0;
      player.animations.play('up');
	  } else if (cursor.down.isDown) {
      this.lastFrame = 1;
      player.body.velocity.y = 150;
      player.body.velocity.x = 0;
      player.animations.play('down');
	  } else {
	  	player.body.velocity.x = 0;
	  	player.body.velocity.y = 0;
      player.animations.stop();
      player.frame = this.lastFrame;      
	  }  	    
  },

  walkAnimations: function (player) {
  	player.animations.add('down', [1, 0, 2], 10, true);
  	player.animations.add('left', [4, 3, 5], 10, true);
  	player.animations.add('right', [7, 6, 8], 10, true);
  	player.animations.add('up', [10, 9, 11], 10, true);  
  }
};

