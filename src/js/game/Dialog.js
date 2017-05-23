import GLOBALS from '../core/Globals';

export default class Dialog {
  constructor(data, cb) {
    this.data = data;
    this.cb = cb;

    this.$dialogWrapper = $('.dialog__wrapper');
    this.$dialogText = this.$dialogWrapper.find('.dialog__text');

    this.currentLine = 1;
    this.numberOfLines = this.data.lines.length;

    this.setup();
    this.bind();
  }

  setup() {
    this.$dialogText.html(this.data.lines[0]);
    this.$dialogWrapper.removeClass('hide');
  }

  bind() {
    this.event = $(document).on('keydown', ev => {
      const key = ev.keyCode;

      if(key === GLOBALS.KEY_CODES.ENTER) {
        this.nextLine();
      }

      if(this.currentLine > this.numberOfLines) {
        this.event.unbind();
      }
    });
  }

  nextLine() {
    if(this.currentLine === this.numberOfLines) {
      this.$dialogWrapper.addClass('hide');
      this.cb();
    } else {
      this.currentLine++;
      this.$dialogText.html(this.data.lines[this.currentLine - 1]);
    }
  }
}
