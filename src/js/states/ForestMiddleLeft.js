import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestMiddleLeft extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_MIDDLE_LEFT;

    super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(21, 0, 18, 1, () => {
      this.changeMap('ForestTopLeft', GLOBALS.DIRECTIONS.DOWN);
    }, this);

    this.map.addMapTransition(21, 39, 18, 1, () => {
      this.changeMap('ForestBottomLeft', GLOBALS.DIRECTIONS.UP);
    }, this);
  }
}
