import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class UselessCity extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.USELESS_CITY;
    this.isCity = true;

    super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(19, 39, 4, 1, () => {
      this.changeMap('ForestBottomMiddle', GLOBALS.DIRECTIONS.UP, 96);
    }, this);

    this.map.addMapTransition(15, 27, 1, 1, () => {
      this.changeMap('House01', GLOBALS.DIRECTIONS.DOWN, 96);
    }, this);
  }
}
