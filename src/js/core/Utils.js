import GLOBALS from '../core/Globals';

export default class Utils {
  static formatClass(characterClass) {
    let classString;

    switch(characterClass) {
      case 1:
        classString = GLOBALS.SWORDSMAN;
        break;

      case 2:
        classString = GLOBALS.MAGE;
        break;

      case 3:
        classString = GLOBALS.ARCHER;
        break;
    }

    return classString;
  }

  static getTemplate(template, cb) {
    $.get('templates/'+template+'.html', (response) => {
      cb(response);
    });
  }

  static serializeObject(obj) {
    let o = {},
        a = obj.serializeArray();

    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });

    return o;
  };
}
