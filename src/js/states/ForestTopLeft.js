import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestTopLeft extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_TOP_LEFT;

    return super.init(options);
  }

  create() {
    super.create();
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(39, 4, 1, 35, () => {
      this.changeMap('ForestTopMiddle', GLOBALS.DIRECTIONS.LEFT, 64);
    }, this);

    this.map.addMapTransition(21, 39, 18, 1, () => {
      this.changeMap('ForestMiddleLeft', GLOBALS.DIRECTIONS.UP, 64);
    }, this);
  }
}
