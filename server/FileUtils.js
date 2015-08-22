var hummus = Meteor.npmRequire('hummus');
var fs = Meteor.npmRequire('fs');
var os = Meteor.npmRequire('os');
var path = Meteor.npmRequire('path');

createPDF = function(data) {
  var outfile = path.join(os.tmpDir(), 'out.pdf');

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
  pageModifier.startContext().getContext().writeText('Test Text',
													478,
													666,
													{
                            font:pdfWriter.getFontForFile(process.env["PWD"] + '/server/static/Couri.ttf'),
                            size:14,
                            colorspace:'gray',
                            color:0x00
                          });

  // https://github.com/galkahana/HummusJS/wiki/Show-text has some
  // methods you can use to measure text and get a width, should help
  // with multi-lining
  pageModifier.endContext().writePage();
  pdfWriter.end();
};
