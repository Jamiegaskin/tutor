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
                              Home Phone: {client.phones.home}, 
                              Mother's Cell: {client.phones.motherCell}, 
                              Father's Cell: {client.phones.fatherCell}, 
                              Student's Cell: {client.phones.studentCell}, 
                              Previous Balance: ${client.previousBalance},
                              Paid this cycle: ${this.paidThisCycle(client)},
                              Current Balance: ${client.balance},
                              <button onClick={this.enterEditMode}>Edit</button>
                              <button onClick={this.enterPayHistoryMode}>View Pay History</button>
          </li>;
  }
});