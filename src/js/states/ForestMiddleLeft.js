import GLOBALS from '../core/Globals';
import MapState from './MapState';

export default class ForestMiddle extends MapState {
  getPlayerPosition() {
    if(this.options.previousMap) {
      switch(this.options.previousMap) {
        case GLOBALS.MAPS.FOREST_TOP_LEFT:
          return {x: 750, y: 0};
      }
    } else {
      return super.getPlayerPosition();
    }
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(21, 0, 3, 1, () => {
      if(!this.shouldChangeMap) {return;}

      if(!this.willChangeMap) {
        this.willChangeMap = true;

        const options = {
          characterData: this.options.characterData,
          previousMap: GLOBALS.MAPS.FOREST_MIDDLE_LEFT,
          map: GLOBALS.MAPS.FOREST_TOP_LEFT,
          enterPosition: GLOBALS.DIRECTIONS.BOTTOM
        }

        setTimeout(() => {
          this.game.state.start('ForestTopLeft', true, false, options);
        }, 100);
      }
    }, this);
  }
}
