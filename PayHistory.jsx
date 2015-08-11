PayHistory = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var username = Meteor.user().username;
    var thisID = StateVars.findOne({user: username}).editID;
    return {
      sessionID: StateVars.findOne({user: username})._id,
      thisClient: Clients.findOne({_id: thisID}),
    };
  },
  enterEditMode: function() {
    StateVars.update(this.data.sessionID, {$set:{mode: "editPayHistory", editID: this.data.thisClient._id}});
  },
  exit: function() {
    StateVars.update(this.data.sessionID, {$set:{mode: "manageClients"}});
  },
  render: function() {
    var client = this.data.thisClient;
    return <div>
            <h1>Pay History</h1>
            <h2>{client.parents}</h2>
            <ul>
              {client.payHistory.map(function(check) {
                return <li>Date: {check.date}, Number: {check.checkNum}, Amount: ${check.amount}</li>
              })}
            </ul>
            <button onClick={this.enterEditMode}>Edit</button>
            <button onClick={this.exit}>Done</button>
          </div>;
  }
});