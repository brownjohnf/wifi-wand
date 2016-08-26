var util = require("util")
    EventEmitter = require("events").EventEmitter
    iwlist = require('wireless-tools/iwlist')
    _ = require('lodash')

// utils
_div = function(v) {
  return v/255
}

_scan = function(ssid, callback) {
  iwlist.scan('wlan0', function(err, networks) {
    if ( _.isArray(ssid)) {
      if (ssid.length != 3) {
        err = '3 networks need to be detected'
      }
      callback(err, _(networks)
                     .keyBy('ssid')
                     .at(ssid)
                     .orderBy('ssid', 'asc')
                     .value())
    } else {
      callback(err, _.find(networks, { 'ssid': ssid }))
    }
  })
}

// event Emitter
function Wand(ssid, colorScale, fb, interval) {
    EventEmitter.call(this)
    this.scanInterval = interval || 3000
    this.ssid = ssid // can be string or array
    this.colorScale = colorScale
    this.fb = fb

    this._monitor = function(self) {
        if (!self.ssid) {
          self.emit('error', 'A network SSID must be set')
        }
        setInterval(function () {
          _scan(self.ssid, function(err, network) {
            if (err) {
              self.emit('error', err)
            } else if (_.isUndefined(network)) {
              self.emit('error', 'SSID not found on network')
            } else {
              self.emit('change', network)
            }
          })
        }, self.scanInterval)
    }

    this.getColor = function(network) {
      network.color = _.chain(this.colorScale(network.signal)._rgb)
                       .dropRight()
                       .map(_div)
                       .value()
      callback(network);
    }

    this.getColors = function(networks, callback) {
      callback(_.map(networks, this.getColor))
    }

    this.writeColor = function(rgb) {
      this.fb.color(rgb[0], rgb[1], rgb[2])
      this.fb.rect(0, 0, this.fb.xMax, this.fb.yMax, true)
      this.fb.blit()
    }

    this.mixColors = function(rgbArray) {
      // mixes three rgb arrays
      return _.map(rgbArray, function(rgb, index) {
        return rgb[index]
      })
    }

    this._monitor(this)
}

util.inherits(Wand, EventEmitter)

module.exports = Wand;
