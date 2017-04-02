import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class UselessCity extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.USELESS_CITY;

    super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(18, 39, 4, 1, () => {
      this.changeMap('ForestBottomMiddle', GLOBALS.DIRECTIONS.UP, 96);
    }, this);
  }
}
