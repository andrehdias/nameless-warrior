import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestBottomMiddle extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_BOTTOM_MIDDLE;

    return super.init(options);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(39, 3, 1, 35, () => {
      this.changeMap('ForestBottomRight', GLOBALS.DIRECTIONS.LEFT);
    }, this);

    this.map.addMapTransition(0, 3, 1, 35, () => {
      this.changeMap('ForestBottomLeft', GLOBALS.DIRECTIONS.RIGHT);
    }, this);

    this.map.addMapTransition(19, 2, 2, 1, () => {
      this.changeMap('UselessCity', GLOBALS.DIRECTIONS.DOWN);
    }, this);
  }
}
