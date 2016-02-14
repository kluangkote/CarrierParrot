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

this.gatherImages = function (){
    var fs = require('fs');
    var list = [];
    fs.readdir('./files/',function(err,files){
        if(err) throw err;
        files.forEach(function(file){   // loop through all files in files
            if(file.startsWith("output"))   // if it is a file from the drone video
                list.push(file)  // add file to list
        });
    });
    detectFace(list)    // call detectFace with list of pictures from drone video
}

this.detectFace = function (listOfPictures){
    for(var i = 0; i <= listOfPictures.length; i += 5){  // loop through every 5 pictures
        cv.readImage("./files/"+listOfPictures.get(i), function(err, im){
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