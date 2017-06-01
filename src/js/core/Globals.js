const GLOBALS = {
  PLAYER: 'player',
  NPC: 'NPC',
  ENEMY: 'enemy',

  SWORDSMAN: 'SwordsMan',
  MAGE: 'Mage',
  ARCHER: 'Archer',

  ENEMIES: {
    SLIME: 'Slime',
    MUSHROOM: 'Mushroom'
  },

  MAPS: {
    FOREST_TOP_LEFT: 'forest_top_left',
    FOREST_TOP_MIDDLE: 'forest_top_middle',
    FOREST_TOP_RIGHT: 'forest_top_right',
    FOREST_MIDDLE_LEFT: 'forest_middle_left',
    FOREST_MIDDLE_RIGHT: 'forest_middle_right',
    FOREST_BOTTOM_LEFT: 'forest_bottom_left',
    FOREST_BOTTOM_MIDDLE: 'forest_bottom_middle',
    FOREST_BOTTOM_RIGHT: 'forest_bottom_right',
    USELESS_CITY: 'useless_city',
    HOUSE_01: 'house_01',
    HOUSE_02: 'house_02'
  },

  MUSICS: {
    SAD_TOWN: 'SadTown',
    SAD_DESCENT: 'SadDescent'
  },

  DIRECTIONS: {
    UP: 'top',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    STOP: 'stop'
  },

  TEXT_STYLES: {
    DAMAGE: { font: "14px FreePixel", fontWeight: 'Bold', fill: "#000", wordWrap: true, wordWrapWidth: 32, align: "center" },
    NPC_TEXT: { font: "14px FreePixel", fontWeight: 'Bold', fill: "#fff", wordWrap: false, align: "center" },
    DEAD: { font: "20px FreePixel", fontWeight: 'Bold', fill: "#fff", align: "center" },
    LOADING: { font: "18px FreePixel", fill: "#fff"}
  },

  KEY_CODES: {
    ENTER: 13,
    A: 65,
    L: 76,
    ONE: 49,
    TWO: 50
  }
}

export default GLOBALS;
