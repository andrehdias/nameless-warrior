import GLOBALS from '../core/Globals';
import config from 'config';
import Utils from '../core/Utils';

export default class Map {
  constructor(game, options) {
    this.options = options;

    this.game = game;
    this.map = this.game.add.tilemap(this.options.map);

    const gameWidth = this.map.widthInPixels;
	  const	gameHeight = this.map.heightInPixels;

	  this.game.world.setBounds(0, 0, gameWidth, gameHeight);

    this.map.addTilesetImage('sprites_background_v2_32x32', 'sprites_background_v2_32x32');

    this.groundLayer = this.map.createLayer('Ground');
    this.groundOverlapLayer = this.map.createLayer('Ground_overlap');
    this.collideLayer = this.map.createLayer('Collide');

    this.groundLayer.resizeWorld();
    this.groundOverlapLayer.resizeWorld();
    this.collideLayer.resizeWorld();

    this.map.currentLayer = 3;

    this.map.setCollisionBetween(1, 10000, true, this.collideLayer);

    var index = this.map.getTile(14, 14, this.collideLayer, true).index;

    this.map.setTileIndexCallback([index], () => {
      console.log('hey')
    });
  }

  renderLastLayer() {
    this.passLayer = this.map.createLayer('Pass');
    this.passLayer.resizeWorld();
  }
}
