var NWarrior = NWarrior || {};

NWarrior.Character = function(game) {
	this.class;
	this.nickname;

	this.str;
	this.con;
	this.dex;
	this.int;
	this.cha;

	this.hp;
	this.mana;
	this.stamina;
	this.hunger;
	this.sleep;

	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'player');

	this.create();
};

NWarrior.Character.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Character.prototype.constructor = NWarrior.Character;

NWarrior.Character.prototype.create = function() {
	this.game.add.existing(this);	

  this.frame = 1;
  this.game.physics.arcade.enable(this);            
  this.body.collideWorldBounds = true;    
  this.game.camera.follow(this);	
	this.cursors = this.game.input.keyboard.createCursorKeys();
	
  utils.walkAnimations(this);
};

NWarrior.Character.prototype.update = function() {
	utils.walkCursors(this.cursors, this);	
};
var NWarrior = NWarrior || {};

NWarrior.Enemy = function(game){
		this.type;

		this.str;
		this.con;
		this.dex;
		this.int;
		this.cha;

		this.hp;
		this.mana;
		this.stamina;
		this.hunger;
		this.sleep;

		Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'Enemy');    
    this.create();
};

NWarrior.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Enemy.prototype.constructor = NWarrior.Enemy;

NWarrior.Enemy.prototype.create = function() {	

};
var NWarrior = NWarrior || {};

NWarrior.Hud = function(game){
	this.game = game;
	this.create();
};

NWarrior.Hud.prototype = {
	create: function() {
    var style = { font: "18px Helvetica", fill: "#fff", tabs: 60 };
				text = this.game.add.text(10, 10, "Vida:\tMana:", style),
				text2 = this.game.add.text(10, 30, "100\t50", style);

		text.fixedToCamera = true;
		text2.fixedToCamera = true;

		/*this.music = this.game.add.audio('backgroundMusic');
		this.music.play('', 0, 1, true);*/

		var audio = this.game.add.sprite(720, 10, 'audio');

    audio.fixedToCamera = true;
		audio.scale.setTo(0.7, 0.7);		

		audio.inputEnabled = true;
		audio.events.onInputDown.add(this.turnAudio, this);		
	},

	turnAudio: function(audio) {
		if(this.music.mute == true) {
			this.music.mute = false;
		} else {
			this.music.mute = true;
		}
	}
}
var NWarrior = NWarrior || {};

NWarrior.Map = function(game) {
		this.game = game;

		this.create();
};

NWarrior.Map.prototype = {
	create: function() {
		this.map = this.game.add.tilemap('sampleMap');

	  var game_width = this.map.widthInPixels,
	  		game_height = this.map.heightInPixels;

	  this.game.world.setBounds(0, 0, game_width, game_height);

		this.map.addTilesetImage('TileCraftGroundSet', 'tiles');		

		this.ground = this.map.createLayer("layer1");		
		this.ground.resizeWorld();						
	}
}
var NWarrior = NWarrior || {};

NWarrior.Npc = function(game){
		this.type;

		this.str;
		this.con;
		this.dex;
		this.int;
		this.cha;

		this.hp;
		this.mana;
		this.stamina;
		this.hunger;
		this.sleep;

		Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'npc');
    this.create();
};

NWarrior.Npc.prototype = Object.create(Phaser.Sprite.prototype);
NWarrior.Npc.prototype.constructor = NWarrior.Character;

NWarrior.Npc.prototype.create = function() {
  this.game.add.existing(this);	 

  this.game.physics.arcade.enable(this);            
  this.body.collideWorldBounds = true;    
  this.frame = 4;
  this.enableBody = true;    
  
  utils.walkAnimations(this);    
  utils.randomWalk(this, 50);      	
};

NWarrior.Npc.prototype.update = function() {
};
var utils = {
  walkAnimations: function (player) {
    player.animations.add('down', [1, 0, 2], 10, true);
    player.animations.add('left', [4, 3, 5], 10, true);
    player.animations.add('right', [7, 6, 8], 10, true);
    player.animations.add('up', [10, 9, 11], 10, true);  
  },

  walk: function(direction, character, velocity) {
    velocity = velocity || 50;

    switch(direction){
      case 'down':
        this.lastFrame = 1;
        character.body.velocity.y = velocity;
        character.body.velocity.x = 0;
        break;

      case 'up':
        this.lastFrame = 10;
        character.body.velocity.y = -velocity;
        character.body.velocity.x = 0;
        break;

      case 'left':       
        this.lastFrame = 4;
        character.body.velocity.x = -velocity;
        character.body.velocity.y = 0;
        break;

      case 'right':
        this.lastFrame = 7;
        character.body.velocity.y = 0;
        character.body.velocity.x = velocity;
        break;
        
      case 'stop':
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.animations.stop();
        break;      
    }

    character.animations.play(direction);    
  },

  walkCursors: function (cursor, player, speed) {    
    speed = speed || 150;

		if (cursor.left.isDown) {
      this.walk('left', player, speed);
    } else if (cursor.right.isDown) {      
      this.walk('right', player, speed);
	  } else if (cursor.up.isDown) {
      this.walk('up', player, speed);
	  } else if (cursor.down.isDown) {
      this.walk('down', player, speed);
	  } else {
	  	this.walk('stop', player, speed);
	  }  	    
  },
  
  randomWalk: function(character, speed) {
    var _this = this,
        speed = speed || 150;

    setInterval(function() {
      var direction = Math.floor(Math.random() * (6 - 1)) + 1;      
      
      switch(direction){
        case 1:
          _this.walk('down', character, speed);
          break;

        case 2:
          _this.walk('up', character, speed);
          break;

        case 3:       
          _this.walk('left', character, speed);
          break;

        case 4:
          _this.walk('right', character, speed);
          break;

        case 5:
          _this.walk('stop', character, speed);
          break;
      }
    }, 1000);
  }
};
var NWarrior = NWarrior || {};

NWarrior.Boot = function(){};

NWarrior.Boot.prototype = {
	preload: function() {
		this.loadingStyle = { font: "18px Helvetica", fill: "#fff"},
		this.loading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Carregando...", this.loadingStyle);
		
		this.loading.anchor.setTo(0.5);

		this.game.load.spritesheet('player', 'img/char2.png', 31, 32);			
		this.game.load.spritesheet('npc', 'img/char3.png', 31, 32);			
		this.game.load.tilemap('sampleMap', 'tiles/sample_map2.json', null, Phaser.Tilemap.TILED_JSON);	
		this.game.load.image('tiles', 'tiles/TileCraftGroundSet.png');
		this.game.load.audio('backgroundMusic', 'audio/RetroMystic.ogg');

		//hud
		this.game.load.image('settings', 'img/wrench.png');
		this.game.load.image('audio', 'img/audioOn.png');
	},

	create: function() {
		NWarrior.game.state.start('Game');
	}
}
var NWarrior = NWarrior || {};

NWarrior.Game = function(){
	this.npcsNumber = 20;
};

NWarrior.Game.prototype = {
	create: function() {				
		this.game.time.advancedTiming = true;

		this.map = new NWarrior.Map(this.game);    		

		this.player = new NWarrior.Character(this.game);

		this.npcs = [];
		this.npcsGroup = this.game.add.group();

		for(var i = 0; i < this.npcsNumber; i++) {
    	this.npcs[i] = new NWarrior.Npc(this.game);   
    	this.npcsGroup.add(this.npcs[i]);
		}

		console.log(this.npcs)


		this.hud = new NWarrior.Hud(this.game);    		
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.npcsGroup);
	},

	render: function() {
		this.game.debug.text(this.game.time.fps || '--', 10, 430, "#000"); 
	}
}
var NWarrior = NWarrior || {};

NWarrior.game = new Phaser.Game(768, 448, Phaser.AUTO, 'phaser');

NWarrior.game.state.add('Boot', NWarrior.Boot);
NWarrior.game.state.add('Game', NWarrior.Game);

NWarrior.game.state.start('Boot');
