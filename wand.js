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

util.inherits(Wand, EventEmitter);

Wand.prototype._monitor = function() {
    var self = this
    setInterval(function () {
      _scan(self.ssid, function(err, network) {
        if (err) {
          self.emit('error', err);
        } else {
          self.emit('change', network);
        }
      })
    }, self.scanInterval);
}

_scan = function(ssid, callback) {
  iwlist.scan('wlan0', function(err, networks) {
    console.log('ssid: ', ssid)
    // console.log('networks: ', networks)
    callback(err, _.find(networks, { 'ssid': ssid }));
  });
}

module.exports = Wand;
