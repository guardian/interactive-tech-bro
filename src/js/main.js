// Javascript that is inline. Should be used for anything that needs to be immediate
window.$ = require('./vendor/jquery.js');

var share = require('./modules/share.js');
var slider = require('./modules/slider.js');
var footnote = require('./modules/footnote.js');

share.init();
slider.init();
footnote.init();