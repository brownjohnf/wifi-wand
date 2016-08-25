var util = require("util")
    EventEmitter = require("events").EventEmitter
    iwlist = require('wireless-tools/iwlist')
    _ = require('lodash')

function Wand(ssid, interval) {
    EventEmitter.call(this)
    this.scanInterval = interval || 3000
    this.ssid = ssid
    this._monitor()
}

util.inherits(Wand, EventEmitter)

Wand.prototype._monitor = function() {
    var self = this
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
          console.log(network.length)
          self.emit('change', network)
        }
      })
    }, self.scanInterval)
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
                     .value())
    } else {
      callback(err, _.find(networks, { 'ssid': ssid }))
    }
  });
}

module.exports = Wand;
