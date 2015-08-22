SingleClientView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisClient: Clients.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    var currentUserID = StateVars.findOne({user: Meteor.user().username})._id;
    StateVars.update(currentUserID, {$set:{mode: "editClient", editID: this.props.thisID}});
  },
  enterPayHistoryMode: function() {
    var currentUserID = StateVars.findOne({user: Meteor.user().username})._id;
    StateVars.update(currentUserID, {$set:{mode: "payHistory", editID: this.props.thisID}});
  },
  paidThisCycle: function(client) {
    var sum = 0;
    this.data.thisClient.payHistory.map(function(check) {
      sum += check.amount;
    })
    return sum;
  },
  render: function() {
    var client = this.data.thisClient;
    return <li key={client._id}>Parent(s): {client.parents},
                              Students: {client.students.join(", ")},
                              Emails: {client.emails.join(", ")},
                              Address: {client.address1 + ", " + client.address2},
                              Home Phone: {client.phoneNums.home}, 
                              Mother's Cell: {client.phoneNums.motherCell}, 
                              Father's Cell: {client.phoneNums.fatherCell}, 
                              Student's Cells: {client.phoneNums.studentCell.join(", ")}, 
                              Previous Balance: ${client.previousBalance},
                              Paid this cycle: ${this.paidThisCycle(client)},
                              Current Balance: ${client.balance},
                              Active: {client.active? "yes":"no"}
                              <button className="btn btn-default" onClick={this.enterEditMode}>Edit</button>
                              <button className="btn btn-default" onClick={this.enterPayHistoryMode}>View Pay History</button>
          </li>;
  }
});