console.log('wifi-wand init')
var pitft = require("pitft");
var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode
// Clear the screen buffer
fb.clear();

var Chance = require('chance');
var chance = new Chance();

var chroma = require('chroma-js');
var colorScale = chroma.scale(['red', 'green']).domain([-30, -80])

var Wand = require('./wand')

w = new Wand(process.env.SSID, process.env.SCAN_INTERVAL)

w.on('change', function(network) {
    console.log(network.signal)
    writeColor(network.signal)
})

// get screen size
var xMax = fb.size().width;
var yMax = fb.size().height;

function writeColor(signal) {
  // chance.integer({min: -80, max: -10})
  var rgb = colorScale(signal)._rgb

  fb.color(rgb[0], rgb[1], rgb[2]);
  fb.rect(0, 0, xMax, yMax, true, 1);
}
