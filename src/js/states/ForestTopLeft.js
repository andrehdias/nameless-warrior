import GLOBALS from '../core/Globals';
import MapState from './MapState';
import Dialog from '../game/Dialog';

export default class ForestTopLeft extends MapState {
  create() {
    super.create();

    if(!this.welcomeDone) {
      this.welcome = new Dialog(
        {
          lines: [
            "Welcome to Nameless Warrior! (Press ENTER to advance)",
            "Use the Arrow Keys to move your character! (Press ENTER to advance)",
            "Use the \"A\" key to attack your enemies (Press ENTER to advance)"
          ]
        },
        () => {
          this.welcomeDone = true;
        }
      );
    }
  }

  getPlayerPosition() {
    if(this.options.previousMap) {
      switch(this.options.previousMap) {
        case GLOBALS.MAPS.FOREST_MIDDLE_LEFT:
          return {x: 760, y: 1248};
      }
    } else {
      return super.getPlayerPosition();
    }
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(21, 39, 3, 1, () => {
      if(!this.shouldChangeMap) {return;}

      if(!this.willChangeMap) {
        this.willChangeMap = true;

        const options = {
          characterData: this.options.characterData,
          previousMap: GLOBALS.MAPS.FOREST_TOP_LEFT,
          map: GLOBALS.MAPS.FOREST_MIDDLE_LEFT,
          enterPosition: GLOBALS.DIRECTIONS.TOP
        }

        setTimeout(() => {
          this.game.state.start('ForestMiddleLeft', true, false, options);
        }, 100);
      }
    }, this);
  }
}
