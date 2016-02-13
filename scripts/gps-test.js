"use strict";

var bebop = require("../lib/node_modules/node-bebop");

var drone = bebop.createClient();

drone.connect(function() {
    drone.GPSSettings.resetHome();
    drone.WifiSettings.outdoorSetting(1);
    drone.on("PositionChanged", function(data) {
	console.log(data);
    })
});
