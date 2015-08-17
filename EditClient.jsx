EditClient = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var username = Meteor.user().username;
    var session = StateVars.findOne({user: username})
    return {
      clientID: session.editID,
      thisClient: Clients.findOne({_id: session.editID}),
    };
  },
  exit: function() {
    Meteor.call("setMode", "manageClients");
  },
  editClient: function() {
    var emails = document.getElementById("emailEdit").value;
    var students = document.getElementById("studentEdit").value; 
    var parent = document.getElementById("parentEdit").value;
    var address1 = document.getElementById("address1Edit").value;
    var address2 = document.getElementById("address2Edit").value;
    var home = document.getElementById("home").value;
    var motherCell = document.getElementById("motherCell").value;
    var fatherCell = document.getElementById("fatherCell").value;
    var studentCell = document.getElementById("studentCell").value;
    var previousBalance = document.getElementById("previousBalanceEdit").value;
    var currentBalance = document.getElementById("balanceEdit").value;
    Meteor.call("editClient", this.data.clientID, parent, students, emails, address1, address2, previousBalance, currentBalance);
    this.exit();
  },
  enterPayHistory: function() {
    Meteor.call("setMode", "editPayHistory");
  },
  deleteClient: function() {
    if (window.confirm("Are you sure you want to delete this client?")) { 
      Meteor.call("deleteClient", this.data.thisClient._id);
      this.exit();
    }
  },
  render: function() {
    var client = this.data.thisClient;
    return (
      <div>
        <p>Parents: <input id="parentEdit" type="text" defaultValue={client.parents} /></p>
        <p>Students: <input id="studentEdit" type="text" defaultValue={client.students.join(", ")} /></p>
        <p>Emails: <input id="emailEdit" type="text" defaultValue={client.emails.join(", ")} /></p>
        <p>House # and Street: <input id="address1Edit" type="text" defaultValue={client.address1} /></p>
        <p>City and State: <input id="address2Edit" type="text" defaultValue={client.address2} /></p>
        <p>Home Phone: <input id="home" type="text" defaultValue={client.phoneNums.home}/></p>
        <p>Mother's Cell: <input id="motherCell" type="text" defaultValue={client.phoneNums.motherCell} /></p>
        <p>Father's Cell: <input id="fatherCell" type="text" defaultValue={client.phoneNums.fatherCell}/></p>
        <p>Student's Cell: <input id="studentCell" type="text" defaultValue={client.phoneNums.studentCell.join(", ")}/></p>
        <p>You should not have to edit these, unless something went wrong.</p>
        <p>Previous Balance: $<input id="previousBalanceEdit" type="text" defaultValue={client.previousBalance} /></p>
        <p>Current Balance: $<input id="balanceEdit" type="text" defaultValue={client.balance} /></p>
        <p><button onClick={this.exit}>Cancel</button>
          <button onClick={this.deleteClient}>Remove Client</button>
          <button onClick={this.enterPayHistory}>Edit Pay History</button>
          <button onClick={this.editClient}>Submit</button></p>
      </div>);
    }
});