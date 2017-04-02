import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestBottomRight extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_BOTTOM_RIGHT;

    return super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(1, 0, 38, 1, () => {
      this.changeMap('ForestMiddleRight', GLOBALS.DIRECTIONS.DOWN);
    }, this);

    this.map.addMapTransition(0, 4, 1, 35, () => {
      this.changeMap('ForestBottomMiddle', GLOBALS.DIRECTIONS.RIGHT);
    }, this);
  }
}
