this.withinRange = function (measuredLat, measuredLong, goalLat, goalLong, range){
    latLowerBound = goalLat - ((range) / (111,111))
    latUpperBound = goalLat + ((range) / (111,111))
    longUpperBound = goalLong + ((range) / ((111,111) * Math.cos(goalLat)))
    longLowerBound = goalLong - ((range) / ((111,111) * Math.cos(goalLat)))
    if(measuredLat < latLowerBound || measuredLat > latUpperBound) {
    	return false
    }
    if(measuredLong < longLowerBound || measuredLong > longUpperBound) {
    	return false
    }
    return true
}

function gatherImages (){
    var fs = require('fs');
    var list = [];
    fs.readdir('.',function(err,files){
        if(err) throw err;
        files.forEach(function(file){   // loop through all files in files
            if(file.startsWith("output"))   // if it is a file from the drone video
                list.push(file)  // add file to list
        });
    });
    detectFace(list)    // call detectFace with list of pictures from drone video
}

function detectFace (listOfPictures){
    for(var i = 0; i < listOfPictures.length; i += 5){  // loop through every 5 pictures
        cv.readImage("."+listOfPictures[i], function(err, im){
            if (err) throw err
            if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
            im.detectObject("../data/haarcascade_frontalface_alt.xml", {}, function(err, faces){
                if (err) throw err
                if(faces.length == 0){  // no faces detected
                    return false
                }
                else{
                    return true
                }
            });
        });
    }
}

function getVideo (){
    console.log("stopped because of reaching coordinates!")
		var output = fs.createWriteStream("./video.h264"),
		    video = drone.getVideoStream();
		video.pipe(output)
		setTimeout(function () {
		    // console.log("unpiping video")
		    // video.unpipe(output)
		    console.log("closing output")
		    output.end()
		    // create image files
		    console.log("here")
		    child = exec("ffmpeg -i video.h264 -qscale:v 2 output_%03d.jpg");
		    console.log("hello")
		    gatherImages()
		}, 10000)
}
var bebop = require("../lib/node_modules/node-bebop");
var fs = require("fs");
var helper = require("./helper.js")
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var drone = bebop.createClient();
getVideo()
