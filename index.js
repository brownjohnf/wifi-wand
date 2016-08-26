var pitft = require("pitft")
var fb = pitft("/dev/fb1") // Returns a framebuffer in double buffering mode// Clear the screen buffer
fb.clear()
// get screen size
fb.xMax = fb.size().width
fb.yMax = fb.size().height

var _ = require('lodash')
    chroma = require('chroma-js')
    colorScale = chroma.scale(_.split(process.env.COLORS, ',')).domain([-10, -80])
    Wand = require('./wand')

w = new Wand(process.env.SSID, colorScale, fb, process.env.SCAN_INTERVAL)

w.on('change', function(network) {
  w.writeColor(w.getColor(network).color)
  w.writeText(network)
})

w.on('error', function(err) {
  console.log(err)
})
