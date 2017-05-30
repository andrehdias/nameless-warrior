import GLOBALS from '../core/Globals';
import MapState from './MapState';
import Dialog from '../game/Dialog';

export default class ForestTopMiddle extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.FOREST_TOP_MIDDLE;

    super.init(options);
  }

  create() {
    super.create();
  }

  getPlayerPosition() {
    return super.getPlayerPosition();
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(39, 4, 1, 35, () => {
      this.changeMap('ForestTopRight', GLOBALS.DIRECTIONS.LEFT, 64);
    }, this);

    this.map.addMapTransition(0, 4, 1, 35, () => {
      this.changeMap('ForestTopLeft', GLOBALS.DIRECTIONS.RIGHT, 64);
    }, this);
  }
}
