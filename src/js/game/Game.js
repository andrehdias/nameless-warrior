NWarrior.GameMain = function() {
	this.init();
}

NWarrior.GameMain.prototype = {
	init: function() {
		if(!localStorage.getItem('NWarriorToken')) {
			window.location.assign('/');
		}

		this.gameWidth = 980,
   	this.gameHeight = 502;

		NWarrior.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, 'phaser');

		NWarrior.game.state.add('Boot', NWarrior.Boot);
		NWarrior.game.state.add('Game', NWarrior.Game);					

		NWarrior.game.state.start('Boot');		

		this.bind();
		this.uiStyle();
	},

	bind: function() {
		var fullscreen = $('.toggle-fullscreen'),
				element = $('#gameWrapper').get(-1);

		fullscreen.on('click', function() {
			if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		    if (element.requestFullScreen) {  
		      element.requestFullScreen();  
		    } else if (element.mozRequestFullScreen) {  
		      element.mozRequestFullScreen();  
		    } else if (element.webkitRequestFullScreen) {  
		      element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
		    }  
		  } else {  
		    if (document.cancelFullScreen) {  
		      document.cancelFullScreen();  
		    } else if (document.mozCancelFullScreen) {  
		      document.mozCancelFullScreen();  
		    } else if (document.webkitCancelFullScreen) {  
		      document.webkitCancelFullScreen();  
		    }  
		  }  
		});
	},

	uiStyle: function() {
		$('.ui-style').each(function() {
			$(this).append('<div class="ui-style__left-border"></div><div class="ui-style__right-border"></div><div class="ui-style__top-border"></div><div class="ui-style__bottom-border"></div><div class="ui-style__top-left-corner"></div><div class="ui-style__top-right-corner"></div><div class="ui-style__bottom-left-corner"></div><div class="ui-style__bottom-right-corner"></div>');
		});
	}
}