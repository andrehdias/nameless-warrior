import GLOBALS from '../core/Globals';
import MapState from './MapState';
import Character from '../game/Character';

export default class UselessCity extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.USELESS_CITY;
    this.isCity = true;

    super.init(options);
  }

  create() {
    super.create();

    let npcClass = (this.player.characterClass === GLOBALS.ARCHER) ? GLOBALS.SWORDSMAN : GLOBALS.ARCHER;

    this.npcs.push(new Character(this.game, {
      characterClass: npcClass,
      health: 70,
      currentHealth: 70,
      name: "Lan",
      speech: [
        "Hi, my name is Lan",
         "Welcome to Useless City!",
         "Why useless? Look around! This city is really useless, as this desolated world"
      ]
    }, GLOBALS.NPC, 555, 1020, this.map));

    this.npcs[0].turnSprite(GLOBALS.DIRECTIONS.RIGHT);
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(19, 39, 4, 1, () => {
      this.changeMap('ForestBottomMiddle', GLOBALS.DIRECTIONS.UP, 128);
    }, this);

    this.map.addMapTransition(14, 26, 1, 1, () => {
      this.changeMap('House01', GLOBALS.DIRECTIONS.DOWN, 96, {x: 144, y: 200});
    }, this);

    this.map.addMapTransition(28, 13, 1, 1, () => {
      this.changeMap('House02', GLOBALS.DIRECTIONS.DOWN, 96, {x: 144, y: 200});
    }, this);
  }
}
