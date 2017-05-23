import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class House01 extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.HOUSE_01;
    this.isHouse = true;
    this.isCity = true;

    super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(4, 7, 1, 1, () => {
      this.changeMap('UselessCity', GLOBALS.DIRECTIONS.UP, 0, {x: 466, y: 920});
    }, this);
  }
}
