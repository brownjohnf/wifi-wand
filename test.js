var chroma = require('chroma-js');
strength = -19
var colorScale = chroma.scale(['lightyellow', 'navy']).domain([-10, -80])
console.log(colorScale(-85)._rgb)

// var Wireless = require('wireless');
// var wireless = new Wireless({
//     iface: 'wlan0',
//     updateFrequency: 1, // Optional, seconds to scan for networks
//     connectionSpyFrequency: 2, // Optional, seconds to scan if connected
//     vanishThreshold: 2 // Optional, how many scans before network considered gone
// });
//
// wireless.enable(function(err) {
//   wireless.start();
// });

// wireless.on('signal', function(network) {
//   // console.log(network.ssid)
//   if (network.ssid === process.env.SSID) {
//     writeColor(network.strength)
//   }
// })

// wireless.on('error', function(err) {
//   console.log(err)
// })

// setInterval(function () {
//   iwlist.scan('wlan0', function(err, networks) {
//     console.log(networks);
//   });
//   // strength = chance.integer({min: -80, max: -10});
//   // writeColor(strength)
// }, 1000);
