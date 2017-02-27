import GLOBALS from '../core/Globals';
import config from 'config';
import Utils from '../core/Utils';

export default class Map {
  constructor(game) {
    this.game = game;
    this.map = this.game.add.tilemap('forest_dummy');

    const gameWidth = this.map.widthInPixels;
	  const	gameHeight = this.map.heightInPixels;

	  this.game.world.setBounds(0, 0, gameWidth, gameHeight);

    this.map.addTilesetImage('sprites_background_32x32', 'sprites_background_32x32');

    this.groundLayer = this.map.createLayer('Ground');
    this.treesLayer = this.map.createLayer('Trees');
    this.objectsLayer = this.map.createLayer('Objects');

    this.groundLayer.resizeWorld();
    this.treesLayer.resizeWorld();
    this.objectsLayer.resizeWorld();
  }
}
