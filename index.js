console.log('wifi-wand init')
var pitft = require("pitft")
var fb = pitft("/dev/fb1", true) // Returns a framebuffer in double buffering mode// Clear the screen buffer
fb.clear()

var _ = require('lodash')
    chroma = require('chroma-js')
    colorScale = chroma.scale([process.env.MAX_COLOR, process.env.MIN_COLOR]).domain([-10, -80])
    Wand = require('./wand')

w = new Wand(process.env.SSID, process.env.SCAN_INTERVAL)

w.on('change', function(network) {
  writeColor(network.signal)
})

w.on('error', function(err) {
  console.log(err)
})

// get screen size
var xMax = fb.size().width
var yMax = fb.size().height

function div(v) {
  return v/100
}

function writeColor(signal) {
  console.log('signal', signal)
  var rgb = _.chain(colorScale(signal)._rgb)
             .dropRight()
             .map(div)
             .value()

  fb.color().apply(null, rgb)
  fb.rect(0, 0, xMax, yMax, true)
  fb.blit()
}
