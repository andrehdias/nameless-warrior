NWarrior.Hud = function(game){
	this.game = game;
	this.bind();
};

NWarrior.Hud.prototype = {
	bind: function() {
    document.addEventListener('keydown', function(e) {
    	console.log(e.keyCode)
    	if (e.keyCode == Phaser.Keyboard.SPACE) {
    		
    		document.querySelector('.dialog__wrapper').classList.add('hide');
    	}
    });
	}
}
