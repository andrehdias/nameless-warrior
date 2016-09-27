var gameUtils = {
  walkAnimations: function (player) {
    player.animations.add('down', [0, 1, 2], 10, true);
    player.animations.add('right', [3, 4, 5], 10, true);
    player.animations.add('up', [6, 7, 8], 10, true);
    player.animations.add('left', [9, 10, 11], 10, true);
  },

  walk: function(direction, character, velocity) {
    velocity = velocity || 50;

    switch(direction){
      case 'down':
        this.lastFrame = 0;
        character.body.velocity.y = velocity;
        character.body.velocity.x = 0;
        break;

      case 'right':
        this.lastFrame = 3;
        character.body.velocity.y = 0;
        character.body.velocity.x = velocity;
        break;

      case 'up':
        this.lastFrame = 6;
        character.body.velocity.y = -velocity;
        character.body.velocity.x = 0;
        break;

      case 'left':
        this.lastFrame = 9;
        character.body.velocity.x = -velocity;
        character.body.velocity.y = 0;
        break;

      case 'stop':
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.frame = this.lastFrame;
        character.animations.stop();
        break;
    }

    character.animations.play(direction);
  },

  walkCursors: function (cursor, player, speed) {
    var direction;

    speed = speed || 250;

		if (cursor.left.isDown) {
      direction = 'left';
    } else if (cursor.right.isDown) {
      direction = 'right';
    } else if (cursor.up.isDown) {
      direction = 'up';
    } else if (cursor.down.isDown) {
      direction = 'down';
    } else {
      direction = 'stop';
    }

    this.walk(direction, player, speed);
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
