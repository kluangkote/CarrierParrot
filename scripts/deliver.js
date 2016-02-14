"use strict";

var bebop = require("../lib/node_modules/node-bebop");
var helper = require("./helper.js")

var drone = bebop.createClient();
console.log(process.argv)
    goalLat = parseFloat(process.argv[2]);
    goalLong = parseFloat(process.argv[3]);
console.log(goalLat)
console.log(goalLong)
drone.connect(function() {
    drone.PilotingSettings.maxAltitude(2);
    drone.PilotingSettings.maxDistance(10);
    drone.PilotingSettings.noFlyOverMaxDistance(1);
    drone.GPSSettings.resetHome();
    drone.WifiSettings.outdoorSetting(1);
    
    drone.takeOff(function() {
	drone.up(.3);
	drone.after(3000, function() {
	    client.stop();
	})
    })
    drone.forward(.3)
    drone.after(15000, function () {
	client.stop();
	client.land();
    })
    drone.on("PositionChanged", function(gpsData) {
	// checks if the drone has reached its destination.
	console.log(gpsData)
	if(helper.withinRange(gpsData[latitude], gpsData[longitude], goalLat, goalLong, 5)){
	    // make the drone go down to one meter and wait for face
	    drone.land()
	}
    })
});

// get gps data
// orient drone toward destination
// rise up x meters
// fly towards destination
// check if we are at destination
// go down to 1 meter
// wait for face
// release payload
// fly home
