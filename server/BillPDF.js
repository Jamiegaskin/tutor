var hummus = Meteor.npmRequire('hummus');
var fs = Meteor.npmRequire('fs');
var os = Meteor.npmRequire('os');
var path = Meteor.npmRequire('path');
var mkdirp = Meteor.npmRequire("mkdirp");

createBillPDF = function(bill) {
  mkdirp(path.join(process.env["PWD"], '/public/bills/', bill.cycle.name));
  var outfile = path.join(process.env["PWD"], '/public/bills/', bill.cycle.name, bill.client.parents+" "+bill.cycle.name+'.pdf');
  // Documentation: https://github.com/galkahana/HummusJS/wiki/
  // All coordinates from bottom left
  // Left side of box is 45
  // Top of box is 598
  // Right of box is 581
  // Bottom of inner box is 308
  // Bottom of total box is 220
  var pdfWriter = hummus.createWriterToModify(process.env["PWD"] + '/server/static/base_bill.pdf',
      {
          modifiedFilePath:outfile,
      });
  var pageModifier = new hummus.PDFPageModifier(pdfWriter,0);
  var textInfo = {
                    font: pdfWriter.getFontForFile(process.env["PWD"] + '/server/static/Times_New_Roman.ttf'),
                    size: 13,
                    colorspace: 'gray',
                    color: 0x00
                  };
  writeDate(bill.cycle.end, textInfo, pageModifier);
  writeParents(bill.client.parents, textInfo, pageModifier)
  var yCoordinate = 562;
  var billTotal = 0;
  var aCancels = 0;
  bill.apptList.map(function(appt) {
    yCoordinate = writeAppt(appt, textInfo, pageModifier, yCoordinate, aCancels);
    billTotal += appt.bill;
  });
  writePreviousBalance(bill.client.previousBalance, textInfo, pageModifier);
  writeCheck(bill, textInfo, pageModifier);
  writeCurrentCharges(billTotal, textInfo, pageModifier);
  writeTotalDue(billTotal+bill.client.previousBalance, textInfo, pageModifier)
  // https://github.com/galkahana/HummusJS/wiki/Show-text has some
  // methods you can use to measure text and get a width, should help
  // with multi-lining
  pageModifier.endContext().writePage();
  pdfWriter.end();
};

var paidThisCycle = function(payHistory, cycle) {
  var sum = 0;
  payHistory.map(function(check) {
    if (check.date < cycle.end && check.date > cycle.start) {
      sum += check.amount;
    }
  })
  return sum;
};

var writeDate = function(cycleEnd, textInfo, pageModifier) {
  pageModifier.startContext().getContext().writeText(cycleEnd, 477, 665, textInfo);
};

var writeParents = function(parents, textInfo, pageModifier) {
  var parentsTextDimensions = textInfo.font.calculateTextDimensions(parents, textInfo.size);
  if (parentsTextDimensions.width < 100 || parents.indexOf(" ") === -1) {
    pageModifier.startContext().getContext().writeText(parents, 487, 643, textInfo);
  } else {
    var parentsArray = parents.split(" ");
    var lineInfo = calcLine(parentsArray, textInfo, 100);
    var yCoordinate = 643;
    pageModifier.startContext().getContext().writeText(lineInfo.line, 487, yCoordinate, textInfo);
    while (!lineInfo.end) {
      parentsArray = parentsArray.slice(lineInfo.nextIndex);
      lineInfo = calcLine(parentsArray, textInfo, 100);
      console.log(lineInfo);
      yCoordinate -= 14;
      pageModifier.startContext().getContext().writeText(lineInfo.line, 487, yCoordinate, textInfo);
    }
  }
};

var writeAppt = function(appt, textInfo, pageModifier, yCoordinate, aCancels) {
  // date
  pageModifier.startContext().getContext().writeText(appt.date.substr(5), 60, yCoordinate, textInfo);

  // hours
  pageModifier.startContext().getContext().writeText(appt.hours, 124, yCoordinate, textInfo);

  // rate
  var hourly = appt.baseRate + (appt.ap? appt.adjustments.ap:0) + (appt.travel? appt.adjustments.travel:0);
  pageModifier.startContext().getContext().writeText("$" + hourly, 490, yCoordinate, textInfo);

  // amount
  pageModifier.startContext().getContext().writeText("$" + appt.bill, 533, yCoordinate, textInfo);

  // notes
  var textDimensions = textInfo.font.calculateTextDimensions(appt.notes, textInfo.size);
  if (textDimensions.width < 320 || appt.notes.indexOf(" ") === -1) {
    pageModifier.startContext().getContext().writeText(appt.notes, 160, yCoordinate, textInfo);
  } else {
    var apptArray = appt.notes.split(" ");
    var lineInfo = calcLine(apptArray, textInfo, 320);
    pageModifier.startContext().getContext().writeText(lineInfo.line, 160, yCoordinate, textInfo);
    while (!lineInfo.end) {
      apptArray = apptArray.slice(lineInfo.nextIndex);
      lineInfo = calcLine(apptArray, textInfo, 320);
      console.log(lineInfo);
      yCoordinate -= 16;
      pageModifier.startContext().getContext().writeText(lineInfo.line, 160, yCoordinate, textInfo);
    }
  }

  yCoordinate -= 22;
  return yCoordinate;
};

var writePreviousBalance = function(previousBalance, textInfo, pageModifier) {
    pageModifier.startContext().getContext().writeText("$" + previousBalance, 530, 295, textInfo);
}

var writeCheck = function(bill, textInfo, pageModifier) {
  var paid = paidThisCycle(bill.client.payHistory, bill.cycle);
  pageModifier.startContext().getContext().writeText("$" + paid, 530, 272, textInfo);
  var checkNum = bill.client.payHistory[0]? bill.client.payHistory[0].checkNum:"-"
  pageModifier.startContext().getContext().writeText(checkNum, 440, 272, textInfo);
}

var writeCurrentCharges = function(bill, textInfo, pageModifier) {
    pageModifier.startContext().getContext().writeText("$" + bill, 530, 250, textInfo);
}

var writeTotalDue = function(totalDue, textInfo, pageModifier) {
    pageModifier.startContext().getContext().writeText("$" + totalDue, 530, 227, textInfo);
}