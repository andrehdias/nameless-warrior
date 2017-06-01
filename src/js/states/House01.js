import GLOBALS from '../core/Globals';
import MapState from './MapState';
import Character from '../game/Character';

export default class House01 extends MapState {
  init(options) {
    this.mapName = GLOBALS.MAPS.HOUSE_01;
    this.isHouse = true;
    this.isCity = true;

    super.init(options);
  }

  create() {
    super.create();

    this.npcs.push(new Character(this.game, {
      characterClass: GLOBALS.MAGE,
      health: 70,
      currentHealth: 70,
      name: "Livinho",
      quest: 'first',
      speech: [
        "I have mission for you, can you please kill 10 slimes? If you do this, I can give you a reward!"
      ],
      completedQuest: [
        "Congratulations! Take this reward in experience! (+1 in all attributes)"
      ]
    }, GLOBALS.NPC, 155, 110, this.map));
  }

  addMapTransitions() {
    super.addMapTransitions();

    this.map.addMapTransition(4, 7, 1, 1, () => {
      this.changeMap('UselessCity', GLOBALS.DIRECTIONS.UP, 0, {x: 464, y: 880});
    }, this);
  }
}
