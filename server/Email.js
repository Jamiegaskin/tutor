//var mailgun = Meteor.npmRequire("mailgun-js")({apiKey: api_key, domain: domain});

sendBillEmail = function(bill) {
	var filepath = path.join(process.env["PWD"], '/public/bills/', bill.cycle.name, bill.client.parents+"_"+bill.cycle.name+'.pdf');
 
 	bill.client.emails.map(function(email) {
 		var data = {
		  from: 'Jenn Gaskin <me@samples.mailgun.org>',
		  to: email,
		  subject: 'Gaskin Tutoring Bill ' + bill.cycle.name,
		  text: 'Dear ' + bill.client.parents + ',\nAttached is your tutoring bill for ' + bill.cycle.name + '.\nBest, Jenn Gaskin',
		  attachment: filepath
		};
		 
		mailgun.messages().send(data, function (error, body) {
		  console.log(body);
		});
 	})
}

sendPayStubEmail = function(payStub) {
	var filepath = path.join(process.env["PWD"], '/public/pay_stubs/', payStub.cycle.name, payStub.client.parents+"_"+payStub.cycle.name+'.pdf');
 
	var data = {
	  from: 'Jenn Gaskin <me@samples.mailgun.org>',
	  to: email,
	  subject: 'Gaskin Tutoring Pay Stub ' + payStub.cycle.name,
	  text: 'Hi ' + payStub.tutor.parents + ',\nAttached is your tutoring pay stub for ' + payStub.cycle.name + '.\nBest, Jenn Gaskin',
	  attachment: filepath
	};
	 
	mailgun.messages().send(data, function (error, body) {
	  console.log(body);
	});
}