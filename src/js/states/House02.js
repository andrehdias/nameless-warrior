import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class House02 extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.HOUSE_02;
    this.isHouse = true;
    this.isCity = true;

    super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    // this.map.addMapTransition(19, 39, 4, 1, () => {
    //   this.changeMap('UselessCity', GLOBALS.DIRECTIONS.DOWN, 96);
    // }, this);
  }
}
