var util = require("util")
    EventEmitter = require("events").EventEmitter;
    iwlist = require('wireless-tools/iwlist');
    _ = require('lodash');

function Wand(ssid, interval) {
    EventEmitter.call(this);
    this.scanInterval = interval || 3000
    this.ssid = ssid
    this._monitor()
}

util.inherits(Wireless, EventEmitter);

Wand.prototype._monitor = function() {
    var self = this
    var strength
    setInterval(function () {
      self._scan(self.ssid, function(network) {
        console.log(network.strength)
        if (!network.strength === strength) {
          self.emit('change', network);
        }
      })
    }, self.interval);
}

Wand.prototype._scan = function(ssid, callback) {
  iwlist.scan('wlan0', function(err, networks) {
    return _.find(networks, { 'ssid': ssid });
  });
}

module.exports = Wand;
