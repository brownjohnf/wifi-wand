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
    SSIDS = _.split(process.env.SSIDS, ',', 3);

w = new Wand(SSIDS, colorScale, fb, process.env.SCAN_INTERVAL)

w.on('change', function(networks) {
  w.getColors(networks, function(networks) {
    // networks not have .color
    w.writeColor(w.mixColors(networks))
  })
})

w.on('error', function(err) {
  console.log(err)
})
