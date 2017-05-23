import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestTopRight extends MapState {
   init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_TOP_RIGHT;

    return super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(0, 4, 1, 35, () => {
      this.changeMap('ForestTopMiddle', GLOBALS.DIRECTIONS.RIGHT, 64);
    }, this);

    this.map.addMapTransition(1, 39, 38, 1, () => {
      this.changeMap('ForestMiddleRight', GLOBALS.DIRECTIONS.UP, 64);
    }, this);
  }
}
