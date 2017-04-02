import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestTopRight extends MapState {
   init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_TOP_RIGHT;

    return super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();
  }
}
