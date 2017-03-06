export default class Dialog {
  constructor(data, cb) {
    this.data = data;
    this.cb = cb;

    this.$dialogWrapper = $('.dialog__wrapper');
    this.$dialogText = this.$dialogWrapper.find('.dialog__text');

    this.actualLine = 1;
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
      const key = ev.key;

      if(this.actualLine === this.numberOfLines) {
        this.event.unbind();
      }

      if(key === 'Enter') {
        this.nextLine();
      }
    });
  }

  nextLine() {
    if(this.actualLine === this.numberOfLines) {
      this.$dialogWrapper.addClass('hide');
      this.cb();
    } else {
      this.actualLine++;
      this.$dialogText.html(this.data.lines[this.actualLine - 1]);
    }
  }
}
