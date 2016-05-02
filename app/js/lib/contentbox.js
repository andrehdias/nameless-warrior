ContentBox = function(selector) {
	this.bindEvents(selector);
}

ContentBox.prototype = {
	bindEvents: function(selector) {
		var boxes = document.querySelectorAll(selector);

		forEach(boxes, function(index, box) {
			console.log(box);
		});
	}
}