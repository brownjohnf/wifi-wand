# Wifi wand

### Requirements

* 1 or 3 mobile phones cable of creating a 2.4ghz hotspot.
* 150 raspberry pis

### Environment variables

`COLORS` : string of colors to map the scale to, note no space between commas. eg: `red,green,blue` (can be hex values to).
`SCAN_INTERVAL` : milliseconds between network scans. default: `3000`. Fastest you can go is `1500` otherwise scans start to fail because of resource busy err.

### Modes
#### Single
To track a single device. Set the following Environment variables
`CMD` = `/index.js`
`SSID`= `myHotSpot`

#### Multi
To track a single device. Set the following Environment variables
`CMD` = `/multi.js`
`SSIDS`= `myHotSpot,yourHotSpot,unicornHotspot` 
