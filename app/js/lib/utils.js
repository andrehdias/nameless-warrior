var utils = {
  centerGameObjects: function (objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    })
  },
  
   walkCursors: function (cursor, player) {
		if (cursor.left.isDown) {
      player.body.velocity.x = -150;
      player.body.velocity.y = 0;
      player.animations.play('left');
	  } else if (cursor.right.isDown) {
      player.body.velocity.y = 0;
      player.body.velocity.x = 150;
      player.animations.play('right');
	  } else if (cursor.up.isDown) {
	  	player.body.velocity.y = -150;
      player.body.velocity.x = 0;
      player.animations.play('up');
	  } else if (cursor.down.isDown) {
	  	player.body.velocity.y = 150;
      player.body.velocity.x = 0;
      player.animations.play('down');
	  } else {
	  	player.body.velocity.x = 0;
	  	player.body.velocity.y = 0;
      player.animations.stop();
      player.frame = 1;
	  }  	
  },

  walkAnimations: function (player) {
  	player.animations.add('down', [1, 0, 2], 10, true);
  	player.animations.add('left', [4, 3, 5], 10, true);
  	player.animations.add('right', [7, 6, 8], 10, true);
  	player.animations.add('up', [10, 9, 11], 10, true);
  }
};

