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
  }
}
