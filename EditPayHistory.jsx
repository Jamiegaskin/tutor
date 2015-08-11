EditPayHistory = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var username = Meteor.user().username;
    var thisID = StateVars.findOne({user: username}).editID;
    return {
      sessionID: StateVars.findOne({user: username})._id,
      thisClient: Clients.findOne({_id: thisID}),
    };
  },
  editPayHistory: function() {
    var newPayments = [];
    var numChecks = this.data.thisClient.payHistory.length;
    for (var k = 0; k < numChecks; k++) {
      var deleteEdit = document.getElementById("deleteEdit" + k).checked;
      if (deleteEdit) {
        continue;
      }
      var dateEdit = document.getElementById("dateEdit" + k).value;
      var numEdit = document.getElementById("numEdit" + k).value;
      var amtEdit = parseFloat(document.getElementById("amtEdit" + k).value);
      newPayments.push({checkNum: numEdit, amount: amtEdit, date: dateEdit});
    }
    Meteor.call("updatePayHistory", this.data.thisClient.parents, newPayments);
    this.exit();
  },
  exit: function() {
    StateVars.update(this.data.sessionID, {$set:{mode: "manageClients"}});
  },
  render: function() {
    var client = this.data.thisClient;
    var count = 0;
    return <div>
            <h1>Pay History</h1>
            <h2>{client.parents}</h2>
            <ul>
              {client.payHistory.map(function(check) {
                var dateEdit = "dateEdit" + count;
                var numEdit = "numEdit" + count;
                var amtEdit = "amtEdit" + count;
                var deleteEdit = "deleteEdit" + count;
                count++;
                return <li>Date: <input id={dateEdit} type="date" defaultValue={check.date} />,
                           Number: <input id={numEdit} type="text" defaultValue={check.checkNum} />,
                           Amount: $<input id={amtEdit} type="text" defaultValue={check.amount} />
                           Delete <input id={deleteEdit} type="checkbox" /></li>;
              })}
            </ul>
            <button onClick={this.editPayHistory}>Submit</button>
            <button onClick={this.exit}>Done</button>
          </div>;
  }
});