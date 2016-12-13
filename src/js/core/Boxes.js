/**
* FormBoxes handling component
*
**/
export default class Boxes {
	constructor(trigger, target) {
		this.trigger = trigger;
		this.target = target;

		this.bindEvents();
	}

	//binds events to elements according to the selector passed as parameter
	bindEvents() {
		let _this = this,
				boxes = $(this.trigger),
				overlay = $('.overlay');

		boxes.each(function() {
			let href = $(this).data("target"),
					actualSection = $(href),
					close = actualSection.find('.formbox__close');

			actualSection.addClass('hide');

			close.click((e) => {
				e.preventDefault();

				overlay.addClass('hide');
				actualSection.removeClass('active');
				actualSection.addClass('hide');
			});

			overlay.click(() => {
				overlay.addClass('hide');
				actualSection.removeClass('active');
				actualSection.addClass('hide');
			});

			$(this).click((e) => {
				e.preventDefault();

				_this.closeAll();

				overlay.removeClass('hide');
				actualSection.removeClass('hide');
				actualSection.addClass('active');
			});
		});
	}

	closeAll() {
		let boxes = $('.formbox');

		boxes.each(function() {
			$(this).removeClass('active');
		});

		$('.overlay').addClass('hide');
	}
}
