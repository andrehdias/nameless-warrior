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
      this.changeMap('ForestBottomMiddle', GLOBALS.DIRECTIONS.UP, 128);
    }, this);

    this.map.addMapTransition(14, 27, 1, 1, () => {
      this.changeMap('House01', GLOBALS.DIRECTIONS.DOWN, 96, {x: 144, y: 200});
    }, this);

    // this.map.addMapTransition(29, 15, 1, 1, () => {
    //   this.changeMap('House02', GLOBALS.DIRECTIONS.DOWN, 96, {x: 144, y: 200});
    // }, this);
  }
}
