import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestMiddleRight extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_MIDDLE_RIGHT;

    return super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(1, 0, 38, 1, () => {
      this.changeMap('ForestTopRight', GLOBALS.DIRECTIONS.DOWN, 64);
    }, this);

    this.map.addMapTransition(1, 39, 38, 1, () => {
      this.changeMap('ForestBottomRight', GLOBALS.DIRECTIONS.UP, 64);
    }, this);
  }
}
