'use strict';

app
  .filter('numberFixedLen', function () {
    return function (n, len) {
      var num = parseInt(n, 10);
      len = parseInt(len, 10);
      if (isNaN(num) || isNaN(len)) {
        return n;
      }
      num = '' + num;
      while (num.length < len) {
        num = '0' + num;
      }
      return num;
    };
  })
  .filter('html', function () {
    return function (input) {
      if ($.parseHTML(input) !== null && $.parseHTML(input).length > 0) {
        if ($.parseHTML(input)[0].data !== undefined) {
          return $.parseHTML(input)[0].data;
        }
      }
    };
  });