this.withinRange = function (measuredLat, measuredLong, goalLat, goalLong, range){
    latLowerBound = goalLat - ((range) / (111,111))
    latUpperBound = goalLat + ((range) / (111,111))
    longUpperBound = goalLong + ((range) / ((111,111) * Math.cos(goalLat)))
    longLowerBound = goalLong - ((range) / ((111,111) * Math.cos(goalLat)))
}
