var pitft = require("pitft")
var fb = pitft("/dev/fb1", true) // Returns a framebuffer in double buffering mode// Clear the screen buffer
fb.clear()
// get screen size
var fb.xMax = fb.size().width
var fb.yMax = fb.size().height

var _ = require('lodash')
    chroma = require('chroma-js')
    colorScale = chroma.scale([process.env.MAX_COLOR, process.env.MIN_COLOR]).domain([-10, -80])
    Wand = require('./wand')

var { mix, getColor, getColors, writeColor } = require('./utils')

var SSIDS = _.split(process.env.SSIDS, ',', 3);
w = new Wand(SSIDS, process.env.SCAN_INTERVAL)

w.on('change', function(networks) {
  getColors(networks, colorScale, function(colors) {
    console.log(mix(colors))
    writeColor(fb, mix(colors))
  })
})

w.on('error', function(err) {
  console.log(err)
})
