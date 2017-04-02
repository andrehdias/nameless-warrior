import GLOBALS from '../core/Globals';
import MapState from './MapState';
import Dialog from '../game/Dialog';

export default class ForestBottomMiddle extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_BOTTOM_MIDDLE;

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

    return super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(39, 4, 1, 35, () => {
      this.changeMap('ForestBottomRight', GLOBALS.DIRECTIONS.LEFT);
    }, this);

    this.map.addMapTransition(0, 4, 1, 35, () => {
      this.changeMap('ForestBottomLeft', GLOBALS.DIRECTIONS.RIGHT);
    }, this);

    this.map.addMapTransition(19, 2, 2, 1, () => {
      this.changeMap('UselessCity', GLOBALS.DIRECTIONS.DOWN);
    }, this);
  }
}
