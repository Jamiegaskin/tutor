Meteor.methods({
	updateEmail: function(newEmail) {
		Meteor.users.update(Meteor.userId(), {$set:{"emails":[{address:newEmail}]}});
	},
	addTutor: function(name, email, status, master, pay, ap, phd, travel) {
		Accounts.createUser({username: name, email: email, password: "pass", profile:{status: status, master: master, pay: {base: pay, ap: ap, phd: phd, travel: travel}}});
		StateVars.insert({user: name, mode: "addAppt", editID: ""});
	},
	editTutor: function(id, name, email, status, master, pay, ap, phd, travel) {
		Meteor.users.update({_id: id}, {$set: {username: name, emails:[{address:email}], profile:{status: status, master: master, pay: {base: pay, ap: ap, phd: phd, travel: travel}}}});
	},
	addAppt: function(tutor, client, date, subject, hours, travel, ap, phd, notes, comments) {
		var adjustments = Adjustments.findOne();
		var payInfo = Meteor.users.findOne({username: tutor}).profile.pay;
		var billBase = Rates.findOne({tutor: tutor, client: client}).rate;
		var bill = billBase*hours + (ap? adjustments.ap:0) + (travel? adjustments.travel:0);
		var pay = payInfo.base*hours + (ap? payInfo.ap:0) + (phd? payInfo.phd:0) + (travel? payInfo.travel:0);
		Appts.insert({tutor: tutor, client: client, date: date, subject: subject, hours: hours, travel: travel, ap: ap, phd: phd, notes: notes, comments: comments, bill: bill, pay: pay, adjustments: adjustments, payInfo: payInfo});
	},
	editAppt: function(id, tutor, client, date, subject, hours, travel, ap, phd, bill, pay, notes, comments) {
		Appts.update({_id: id}, {$set: {tutor: tutor, client: client, date: date, subject: subject, hours: hours, travel: travel, ap: ap, phd: phd, notes: notes, comments: comments, bill: bill, pay: pay}});
	},
	addRate: function(tutor, parents, rate) {
		Rates.insert({tutor: tutor, parents: parents, rate: rate});
	},
	editRate: function(id, tutor, parents, rate) {
		Rates.update({_id: id}, {tutor: tutor, parents: parents, rate: rate});
	},
	addClient: function(parents, students, emails, address1, address2, home, motherCell, fatherCell, studentCell) {
		Clients.insert({parents: parents, students: students.split(", "), emails: emails.split(", "), address1: address1, address2: address2, phoneNums: {home: home, motherCell: motherCell, fatherCell: fatherCell, studentCell: studentCell}, previousBalance: 0, balance: 0, payHistory: []});
	},
	addPayment: function(client, checkNum, amount, date) {
		var payHistory = Clients.findOne({parents: client}).payHistory;
		payHistory.push({checkNum: checkNum, amount: amount, date, date});
		Clients.update({parents: client}, {$set: {payHistory: payHistory}})
	},
	updatePayHistory: function(client, paymentsArray) {
		Clients.update({parents: client}, {$set: {payHistory: paymentsArray}})
	},
	editClient: function(id, parents, students, emails, address1, home, motherCell, fatherCell, studentCell, address2, previousBalance, balance) {
		Clients.update({_id: id}, {$set:{parents: parents, students: students.split(", "), emails: emails.split(", "), address1: address1, address2: address2, phoneNums: {home: home, motherCell: motherCell, fatherCell: fatherCell, studentCell: studentCell}, previousBalance: previousBalance, balance: balance}})
	},
	setMode: function(mode) {
		StateVars.update({user: Meteor.user().username}, {$set: {mode: mode}});
	},
	setModeAndEditID: function(mode, editID) {
		StateVars.update({user: Meteor.user().username}, {$set: {mode: mode, editID: editID}});
	}
})