export default class Moviment {
  constructor() {}

  setupAnimations(character) {
    character.animations.add('down', [0, 1, 2], 10, true);
    character.animations.add('right', [3, 4, 5], 10, true);
    character.animations.add('up', [6, 7, 8], 10, true);
    character.animations.add('left', [9, 10, 11], 10, true);
  }

  walk(direction, character, speed = 50) {
    switch(direction){
      case 'down':
        character.lastFrame = 0;
        character.body.velocity.y = speed;
        character.body.velocity.x = 0;
        break;

      case 'right':
        character.lastFrame = 3;
        character.body.velocity.y = 0;
        character.body.velocity.x = speed;
        break;

      case 'up':
        character.lastFrame = 6;
        character.body.velocity.y = -speed;
        character.body.velocity.x = 0;
        break;

      case 'left':
        character.lastFrame = 9;
        character.body.velocity.x = -speed;
        character.body.velocity.y = 0;
        break;

      case 'stop':
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.frame = character.lastFrame;
        character.animations.stop();
        break;
    }

    character.animations.play(direction);
  }
  
  randomWalk(character, speed = 150) {    
    setInterval(() => {
      let direction = Math.floor(Math.random() * (6 - 1)) + 1;

      switch(direction){
        case 1:
          this.walk('down', character, speed);
          break;

        case 2:
          this.walk('up', character, speed);
          break;

        case 3:
          this.walk('left', character, speed);
          break;

        case 4:
          this.walk('right', character, speed);
          break;

        case 5:
          this.walk('stop', character, speed);
          break;
      }
    }, 1000);
  }
}
