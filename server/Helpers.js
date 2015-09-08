calcLine = function(stringArray, textInfo, maxWidth) {
  var line = "";
  var prospectiveLine = "";
  for (var k in stringArray) {
    line = prospectiveLine;
    prospectiveLine += stringArray[k] + " ";
    var parentsTextDimensions = textInfo.font.calculateTextDimensions(prospectiveLine, textInfo.size);
    if (parentsTextDimensions.width > maxWidth && line != "") {
      return {line: line, nextIndex: k, end: false};
    }
  }
  return {line: prospectiveLine, nextIndex: stringArray.length - 1, end: true} // shouldn't happen unless the function gets passed a one word array.
};

getSemester = function() {
  var today = new Date();
  var todayAdjust = new Date(today.getTime() - today.getTimezoneOffset()*60000);
  var todayStr = todayAdjust.toISOString().substr(0,10);
  var thisYear = todayAdjust.getFullYear()
  var spring = {start: thisYear + "-01-02", end: thisYear + "-06-15"}
  var fall = {start: thisYear + "-08-15", end: thisYear + "-12-20"}
  if (todayStr > fall.start) {
    return fall;
  } else {
    return spring;
  }
};

getNumACancels = function() {
  var semester = getSemester()
  return Appts.find({clientID: client._id, date:{$gt: semester.start, $lt: semester.end}, cancel: "A"}).count()
}