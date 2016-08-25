console.log('wifi-wand init')
var pitft = require("pitft");
var fb = pitft("/dev/fb1", true); // Returns a framebuffer in double buffering mode// Clear the screen buffer
fb.clear();

var Chance = require('chance');
var chance = new Chance();

var chroma = require('chroma-js');
var colorScale = chroma.scale([process.env.MAX_COLOR, process.env.MIN_COLOR]).domain([-10, -80])

var Wand = require('./wand')

w = new Wand(process.env.SSID, process.env.SCAN_INTERVAL)

w.on('change', function(network) {
  console.log(network)
  writeColor(network.signal)
})

w.on('error', function(err) {
  console.log(err)
})

// get screen size
var xMax = fb.size().width;
var yMax = fb.size().height;

function writeColor(signal) {
  // chance.integer({min: -80, max: -10})
  var rgb = colorScale(signal)._rgb
  console.log(signal)
  console.log(Math.floor(rgb[0]), Math.floor(rgb[1]), Math.floor(rgb[2]))
  fb.color();
  fb.rect(0, 0, xMax, yMax, true, 1);
  fb.blit();
}
