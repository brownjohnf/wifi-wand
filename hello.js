var pitft = require("pitft");
var fb = pitft("/dev/fb1");
fb.clear(); // Clear the back buffer

// var Chance = require('chance');
// var chance = new Chance();
//
// var chroma = require('chroma-js');
// var colorScale = chroma.scale(['red', 'green']).domain([-30, -80])
//
// var Monitor = require('./monitor')
//
// m = new Monitor('resin_io', 3000)
//
// m.on('change', function(network) {
//     console.log('booom')
//     writeColor(network.strength)
// })
//
// var xMax = fb.size().width;
// var yMax = fb.size().height;
//
// function writeColor(strength) {
//   // chance.integer({min: -80, max: -10})
//   var rgb = colorScale(strength)._rgb
//
//   fb.color(rgb[0], rgb[1], rgb[2]);
//   fb.rect(0, 0, xMax, yMax, true, 1);
// }
