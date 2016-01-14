SingleClientView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var today = this.getToday();
    return {
      thisCycle: Cycles.findOne({start: {$lt: today}, end: {$gt: today}}),
      thisClient: Clients.findOne({_id: this.props.thisID}),
    };
  },
  getToday: function() {
    var today = new Date();
    var todayAdjust = new Date(today.getTime() - today.getTimezoneOffset()*60000);
    var todayStr = todayAdjust.toISOString().substr(0,10);
    return todayStr;
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
    var cycle = this.data.thisCycle;
    this.data.thisClient.payHistory.map(function(check) {
      if (check.date < cycle.end && check.date > cycle.start) {
        sum += check.amount;
      }
    })
    return sum;
  },
  render: function() {
    var client = this.data.thisClient;
    return <tr key={client._id}><td>{client.parents}</td>
                              <td>{client.students.join(", ")}</td>
                              <td>{client.emails.join(", ")}</td>
                              <td>{client.address1 + ", " + client.address2}</td>
                              <td>{client.phoneNums.home}</td>
                              <td>{client.phoneNums.motherCell}</td> 
                              <td>{client.phoneNums.fatherCell}</td>
                              <td>{client.phoneNums.studentCell.join(", ")}</td>
                              <td>${client.previousBalance}</td>
                              <td>${this.paidThisCycle(client)}</td>
                              <td>${client.balance}</td>
                              <td>{client.active? "yes":"no"}</td>
                              <td>{client.monthly? "yes":"no"}</td>
                              <td>${client.monthRate}</td>
                              <td><button className="btn btn-raised btn-default" onClick={this.enterEditMode}>Edit</button></td>
                              <td><button className="btn btn-raised btn-default" onClick={this.enterPayHistoryMode}>View Pay History</button></td>
          </tr>;
  }
});