import GLOBALS from '../core/Globals';
import MapState from './MapState';
import Dialog from '../game/Dialog';

export default class ForestTopLeft extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_TOP_LEFT;

    return super.init(options);
  }

  create() {
    super.create();

    if(!this.welcomeDone) {
      this.welcome = new Dialog(
        {
          lines: [
            "Welcome to <strong>Nameless Warrior Beta</strong>! Forgive me for any bugs (or don't)). (Press ENTER to advance)",
            "Use the Arrow Keys to move your character! (Press ENTER to advance)",
            "Use the <strong>\"A\"</strong> key to attack your enemies (Press ENTER to advance)"
          ]
        },
        () => {
          this.welcomeDone = true;
        }
      );
    }
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(39, 4, 1, 35, () => {
      this.changeMap('ForestTopMiddle', GLOBALS.DIRECTIONS.LEFT);
    }, this);

    this.map.addMapTransition(21, 39, 18, 1, () => {
      this.changeMap('ForestMiddleLeft', GLOBALS.DIRECTIONS.UP);
    }, this);
  }
}
