"use strict";

var bebop = require("../lib/node_modules/node-bebop");
var fs = require("fs");
var helper = require("./helper.js")
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var drone = bebop.createClient();
console.log(process.argv)
var goalLat = parseFloat(process.argv[2]);
var goalLong = parseFloat(process.argv[3]);
console.log('goalLatitude: ' + goalLat)
console.log('goalLongitude: ' + goalLong)
drone.connect(function() {
    console.log('set max altitude')
    drone.PilotingSettings.maxAltitude(2);
    
    console.log('set max distance')
    drone.PilotingSettings.maxDistance(30);

    console.log('set max distance policy')
    drone.PilotingSettings.noFlyOverMaxDistance(1);

    console.log('reset home')
    drone.GPSSettings.resetHome();
    
    console.log('set outdoor setting to on to enable gps.')
    drone.WifiSettings.outdoorSetting(1);

    console.log('set hull setting to on')
    drone.SpeedSettings.hullProtection(1)

    console.log("taking off")
    drone.takeOff(function() {
	 console.log("takeoff completed. moving up")
	 drone.up(5);
	 setTimeout(function() {
	     console.log("stopping drone movement.")
	     drone.stop();
	 }, 3000);
	console.log("moving forward")
	drone.forward(25)
	setTimeout(function () {
	    console.log("stopped / landed due to timeout")
	    drone.stop();
	    drone.land();
	}, 30000)
	drone.on("PositionChanged", function(gpsData) {
	// checks if the drone has reached its destination.
	console.log("current GPS data: ")
	console.log(gpsData)
	if(helper.withinRange(gpsData['latitude'], gpsData['longitude'], goalLat, goalLong, .005)){
	    // make the drone go down to one meter and wait for face
	    console.log("stopped because of reaching coordinates!")
	    for(var i = 0; i < 10; i++){
		var output = fs.createWriteStream("./video.h264"),
		    video = drone.getVideoStream();
		video.pipe(output)
		setTimeout(function () {
		    // console.log("unpiping video")
		    // video.unpipe(output)
		    console.log("closing output")
		    output.end()
		}, 10000)
		// create image files
		child = exec("ffmpeg -i video.h264 -qscale:v 2 output_%03d.jpg");
	    }
	    drone.land()
	}
	});
    })
});
