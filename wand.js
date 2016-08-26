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
      // if multi mode find all match networks
       _filterNetworks(networks, ssid, function(networks) {
         // strangely it sometimes returns an undefined item in the array
         if (networks.length != 3 || _.some(networks, _.isUndefined)) {
           err = '3 networks need to be detected'
         } else {
           console.log('all good')
         }
         callback(err, networks)
       })
    } else {
      // if single mode find first network
      callback(err, _.find(networks, { 'ssid': ssid }))
    }
  })
}

_filterNetworks = function (networks, ssid, callback) {
  // finds all networks matching array
  callback(_(networks)
             .keyBy('ssid')
             .at(ssid)
             .value())
}

// event Emitter
function Wand(ssid, colorScale, fb, interval) {
    EventEmitter.call(this)
    this.scanInterval = interval || 3000
    this.ssid = ssid // can be string or array
    this.colorScale = colorScale
    this.fb = fb

    this._monitor = function(self) {
        // emits events
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
      // gets rgb color based on network(obj) strength and colorscale
      network.color = _.chain(this.colorScale(network.signal)._rgb)
                       .dropRight()
                       .map(_div)
                       .value()
      return network
    }

    this.getColors = function(networks, callback) {
      // returns array of network objects with color attribue added
      callback(_.map(networks, this.getColor))
    }

    this.writeColor = function(rgb) {
      // writes an rgb config to the framebuffer
      console.log(rbg)
      this.fb.color(rgb[0], rgb[1], rgb[2])
      this.fb.rect(0, 0, this.fb.xMax, this.fb.yMax, true)
      // this.fb.blit()
    }

    this.writeText = function(network) {
      // writes network name and signal strength to frame buffer
      console.log(network.ssid, network.signal)
      this.fb.font("fantasy", 24, true);
      this.fb.text(this.fb.xMax/2, this.fb.yMax/(2-24), network.ssid, true, 0);
      this.fb.text(this.fb.xMax/2, this.fb.yMax/2, network.signal, true, 0);
    }

    this.mixColors = function(networks) {
      return _.chain(networks)
              .orderBy(['ssid'], ['asc'])
              .map(function(network, index) {
                return network.color[index]
              })
              .value()
    }

    this._monitor(this)
}

util.inherits(Wand, EventEmitter)

module.exports = Wand;
