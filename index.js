(function(){

  'use strict';

  var input = document.getElementById('js-input');

  var canvas = document.getElementById('js-canvas'),
      context = canvas.getContext('2d');

  var DOMURL = self.URL || self.webkitURL || self;

  input.addEventListener('input', function(event) {
    var data, svg, url, image;

    data = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + canvas.width + '" height="' + canvas.height + '">' +
        '<foreignObject width="100%" height="100%">' +
          '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px; width: 100px; overflow-wrap: break-word; text-align: center; line-height: 1; font-family: serif;">' +
            input.value.split('').map(function(char) {
              return '<div>' + char + '</div>';
            }).join('') +
          '</div>' +
        '</foreignObject>' +
      '</svg>'
    ].join('');

    svg = new Blob([
      data
    ], {
      // NOTE: Safari cannot draw text if use below
      //type: 'image/svg+xml;charset=utf-8'
      type: 'image/svg+xml'
    });
    url = DOMURL.createObjectURL(svg);

    image = new Image();
    image.onload = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      DOMURL.revokeObjectURL(url);
    };
    image.src = url;
  }, false);

}());
