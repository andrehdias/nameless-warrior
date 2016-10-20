/**
* Util functions
*
**/
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
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

function formatClass(characterClass) {
  var classString;

  switch(characterClass) {
    case 1:
      classString = "SwordsMan";
      break;

    case 2:
      classString = "Mage";
      break;

    case 3:
      classString = "Archer";
      break;
  }

  return classString;
}

function getTemplate(template, cb) {
  $.get('templates/'+template+'.html', function(response) {
    cb(response);
  });
}