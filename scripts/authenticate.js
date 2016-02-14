"use strict";

var bebop = require("../lib/node_modules/node-bebop"),
    cv = require("../lib/node_modules/opencv"),
    fs = require("fs");

var drone = bebop.createClient(),
    mjpg = drone.getMjpegStream(),
    buf = null,
    w = new cv.NamedWindow("Video", 0);

// console.log("hello")
// drone.connect();


// mjpg.on("data", function(data) {
//   buf = data;
// });
// console.log("hello2")

// setInterval(function() {
//     if (buf == null) {
// 	return;
//     }
//     console.log("hello3")
//     console.log(buf)
//     try {
// 	cv.readImage(buf, function(err, im) {
// 	    if (err) {
// 		console.log(err);
// 	    } else {
// 		if (im.width() < 1 || im.height() < 1) {
// 		    console.log("no width or height");
// 		    return;
// 		}
// 		w.show(im);
// 		w.blockingWaitKey(0, 50);
// 	    }
// 	});
//     } catch(e) {
// 	console.log(e);
//     }
// }, 100);

var output = fs.createWriteStream("./test.mjpeg"),
    drone = bebop.createClient(),
    video = drone.getMjpegStream();

video.pipe(output);

drone.connect();
