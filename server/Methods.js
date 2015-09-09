Meteor.methods({
	updateEmail: function(newEmail) {
		Meteor.users.update(Meteor.userId(), {$set:{"emails":[{address:newEmail}]}});
	},

	// Tutor methods
	addTutor: function(name, email, status, master, pay, ap, phd, travel) {
		if (Meteor.user().profile.master) {
			Accounts.createUser({username: name, email: email, password: "pass", profile:{status: status, master: master, pay: {base: pay, ap: ap, phd: phd, travel: travel}}});
			StateVars.insert({user: name, mode: "addAppt", editID: ""});
		}
	},
	editTutor: function(id, name, email, status, master, pay, ap, phd, travel) {
		if (Meteor.user().profile.master) {
			Meteor.users.update({_id: id}, {$set: {username: name, emails:[{address:email}], profile:{status: status, master: master, pay: {base: pay, ap: ap, phd: phd, travel: travel}}}});
		}
	},
	deleteTutor: function(id) {
		Meteor.users.remove({_id: id});
	},

	// Appointment methods
	addAppt: function(tutor, clientID, student, date, subject, hours, travel, ap, phd, cancel, notes, comments) {
		var adjustments = Adjustments.findOne();
		var payInfo = Meteor.users.findOne({username: tutor}).profile.pay;
		var parents = Clients.findOne({students: student}).parents;
		var billBase = Rates.findOne({tutor: tutor, parents: parents}).rate;
		var bill = (billBase + (ap? adjustments.ap:0)) * hours + (travel? adjustments.travel:0);
		var pay = (payInfo.base + (ap? payInfo.ap:0) + (phd? payInfo.phd:0)) * hours + (travel? payInfo.travel:0);
		Appts.insert({tutor: tutor, clientID: clientID, student: student, date: date, subject: subject, hours: hours, travel: travel, ap: ap, phd: phd, notes: notes, comments: comments, bill: bill, pay: pay, adjustments: adjustments, payInfo: payInfo, baseRate: billBase, cancel: cancel});
	},
	editAppt: function(id, tutor, clientID, student, date, subject, hours, travel, ap, phd, cancel, bill, pay, notes, comments) {
		Appts.update({_id: id}, {$set: {tutor: tutor, clientID:clientID, student: student, date: date, subject: subject, hours: hours, travel: travel, ap: ap, phd: phd, notes: notes, comments: comments, bill: bill, pay: pay, cancel: cancel}});
	},
	editApptTutor: function(id, tutor, clientID, student, date, subject, hours, travel, ap, phd, cancel, notes, comments) {
		var appt = Appts.findOne({_id: id});
		var adjustments = appt.adjustments;
		var payInfo = appt.payInfo;
		var billBase = appt.baseRate;
		var bill = (billBase + (ap? adjustments.ap:0))*hours + (travel? adjustments.travel:0);
		var pay = (payInfo.base + (ap? payInfo.ap:0) + (phd? payInfo.phd:0))*hours + (travel? payInfo.travel:0);
		Appts.update({_id: id}, {$set: {tutor: tutor, clientID: clientID, student: student, date: date, subject: subject, hours: hours, travel: travel, ap: ap, phd: phd, notes: notes, comments: comments, bill: bill, pay: pay, cancel: cancel}});
	},
	deleteAppt: function(id) {
		Appts.remove({_id: id});
	},

	// Rate methods
	addRate: function(tutor, parents, rate) {
		Rates.insert({tutor: tutor, parents: parents, rate: rate});
	},
	editRate: function(id, tutor, parents, rate) {
		Rates.update({_id: id}, {tutor: tutor, parents: parents, rate: rate});
	},
	deleteRate: function(id) {
		Rates.remove({_id: id});
	},

	// Client methods
	addClient: function(parents, students, emails, address1, address2, home, motherCell, fatherCell, studentCell) {
		Clients.insert({parents: parents, students: students.split(", "), emails: emails.split(", "), address1: address1, address2: address2, phoneNums: {home: home, motherCell: motherCell, fatherCell: fatherCell, studentCell: studentCell.split(", ")}, previousBalance: 0, balance: 0, payHistory: [], active: true});
	},
	editClient: function(id, parents, students, emails, home, motherCell, fatherCell, studentCell, address1, address2, previousBalance, balance, active) {
		Clients.update({_id: id}, {$set:{parents: parents, students: students.split(", "), emails: emails.split(", "), address1: address1, address2: address2, phoneNums: {home: home, motherCell: motherCell, fatherCell: fatherCell, studentCell: studentCell.split(", ")}, previousBalance: previousBalance, balance: balance, active: active}})
	},
	deleteClient: function(id) {
		Clients.remove({_id: id});
	},
	addPayment: function(client, checkNum, amount, date) {
		var payHistory = Clients.findOne({parents: client}).payHistory;
		payHistory.push({checkNum: checkNum, amount: amount, date: date});
		Clients.update({parents: client}, {$set: {payHistory: payHistory}})
	},
	updatePayHistory: function(client, paymentsArray) {
		Clients.update({parents: client}, {$set: {payHistory: paymentsArray}})
	},

	// Navigation methods
	setMode: function(mode) {
		StateVars.update({user: Meteor.user().username}, {$set: {mode: mode}});
	},
	setNav: function(nav) {
		StateVars.update({user: Meteor.user().username}, {$set: {nav: nav}});
	},
	setModeAndEditID: function(mode, editID) {
		StateVars.update({user: Meteor.user().username}, {$set: {mode: mode, editID: editID}});
	},

	// Billing adjustments
	editAdjustments: function(ap, travel) {
		Adjustments.update({}, {ap: ap, travel: travel});
	},

	// Cycle methods
	addCycle: function(name, start, end) {
		Cycles.insert({name: name, start: start, end: end});
	},
	updateCycle: function(id, name, start, end) {
		Cycles.update({_id: id}, {name: name, start: start, end: end});
	},
	deleteCycle: function(id) {
		Cycles.remove({_id: id});
	},

	// Tutor Pay Extra Methods
	addPayExtra: function(tutorID, cycleID, occasion, amount) {
		PayExtras.insert({tutorID: tutorID, cycleID: cycleID, occasion: occasion, amount: amount});
	},
	editPayExtra: function(id, tutorID, cycleID, occasion, amount) {
		PayExtras.update({_id: id}, {tutorID: tutorID, cycleID: cycleID, occasion: occasion, amount: amount});
	},
	deletePayExtra: function(id) {
		PayExtras.remove({_id: id});
	},

	// Client Bill Extra Methods
	addBillExtra: function(clientID, cycleID, occasion, amount) {
		BillExtras.insert({clientID: clientID, cycleID: cycleID, occasion: occasion, amount: amount});
	},
	editBillExtra: function(id, clientID, cycleID, occasion, amount) {
		BillExtras.update({_id: id}, {clientID: clientID, cycleID: cycleID, occasion: occasion, amount: amount});
	},
	deleteBillExtra: function(id) {
		BillExtras.remove({_id: id});
	},

	// Generate (or regenerate) bills
	generateCycleBills: function(cycle) {
	    Clients.find().map(function(client) {
	      var thisBill = Bills.findOne({"cycle._id": cycle._id, "client._id": client._id});
	      if (!thisBill || !thisBill.sent) {
	        Meteor.call("generateBill", client, cycle);
	      }
	    })
	},
	generateBill: function(client, cycle) {
		console.log("calling generate bill with" + client.parents)
		var apptList = Appts.find({student:{$in: client.students}, date:{$gt: cycle.start, $lt: cycle.end}}, {sort:{date: 1}}).fetch();
		var extras = BillExtras.find({clientID: client._id, cycleID: cycle._id}).fetch()
		var aCancels = getNumACancels();
		if (Bills.findOne({"client._id": client._id, "cycle._id": cycle._id})) {
			Bills.update({"client._id": client._id, "cycle._id": cycle._id}, {client: client, cycle: cycle, apptList: apptList, extras: extras, sent: false, aCancels: aCancels});
			createBillPDF(Bills.findOne({"client._id": client._id, "cycle._id": cycle._id}));
		} else {
			var bill = Bills.insert({client: client, cycle: cycle, apptList: apptList, extras: extras, sent: false, aCancels: aCancels});
			createBillPDF(Bills.findOne(bill));
		}
	},
	approveAndSendBill: function(id) {
		// TODO hook up email service
		Bills.update({_id: id}, {$set: {sent: true}})
	},

	// Generate (or regenerate) Pay Stubs
	generateCyclePays: function(cycle) {
	    Meteor.users.find().map(function(tutor) {
	      if (tutor.profile.status === "Admin") {
	      	return
	      }
	      var thisPayStub = PayStubs.findOne({"cycle._id": cycle._id, "tutor._id": tutor._id});
	      if (!thisPayStub || !thisPayStub.sent) {
	        Meteor.call("generatePayStub", tutor, cycle);
	      }
	    })
	},
	generatePayStub: function(tutor, cycle) {
		var apptList = Appts.find({tutor: tutor, date:{$gt: cycle.start, $lt: cycle.end}}, {sort:{date: 1}}).fetch();
		var extras = PayExtras.find({tutorID: tutor._id, cycleID: cycle._id}).fetch()
		if (PayStubs.findOne({tutor: tutor, "cycle._id": cycle._id})) {
			PayStubs.update({tutor: tutor, "cycle._id": cycle._id}, {tutor: tutor, cycle: cycle, apptList: apptList, extras: extras, sent: false})
			createPayStubPDF(PayStubs.findOne({tutor: tutor, "cycle._id": cycle._id}));
		} else {
			var thisPayStub = PayStubs.insert({tutor: tutor, cycle: cycle, apptList: apptList, extras: extras, sent: false})
			createPayStubPDF(PayStubs.findOne(thisPayStub))
		}
	},
	printBill: function(data) {
		if (Meteor.isServer) {
			createPDF(data);
		}
	},
	approveAndSendPayStub: function(id) {
		// TODO hook up email service
		PayStubs.update({_id: id}, {$set: {sent: true}})
	},

})