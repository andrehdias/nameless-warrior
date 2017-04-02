import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestBottomLeft extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_BOTTOM_LEFT;

    super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(21, 0, 18, 1, () => {
      this.changeMap('ForestMiddleLeft', GLOBALS.DIRECTIONS.DOWN);
    }, this);

    this.map.addMapTransition(39, 4, 1, 35, () => {
      this.changeMap('ForestBottomMiddle', GLOBALS.DIRECTIONS.LEFT);
    }, this);
  }
}
