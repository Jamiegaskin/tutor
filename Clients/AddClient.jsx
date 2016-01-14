AddClient = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      userID: StateVars.findOne({user: currentUser})._id,
    };
  },
  addClient: function() {
    var emails = document.getElementById("emailEdit").value;
    var students = document.getElementById("studentEdit").value; 
    var parent = document.getElementById("parentEdit").value;
    var address1 = document.getElementById("address1Edit").value;
    var address2 = document.getElementById("address2Edit").value;
    var home = document.getElementById("home").value;
    var motherCell = document.getElementById("motherCell").value;
    var fatherCell = document.getElementById("fatherCell").value;
    var studentCell = document.getElementById("studentCell").value;
    var monthly = document.getElementById("monthly").checked;
    var monthlyRate = parseFloat(document.getElementById("monthlyRate").value);
    Meteor.call("addClient", parent, students, emails, address1, address2, home, motherCell, fatherCell, studentCell, monthly, monthlyRate);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "manageClients");
  },
  render: function() {
    return (
      <div>
        <p><input id="parentEdit" type="text" placeholder="Parent Names"/></p>
        <p><input id="studentEdit" type="text" placeholder="Students"/></p>
        <p>Enter full names and seperate multiple students with commas. For example: Peter Gold, Madi Gold, Alex Gold</p>
        <p>Monthly <input id="monthly" type="checkbox"/></p>
        <p><input id="monthlyRate" type="text" placeholder="Monthly Rate"/> (leave blank if not applicable)</p>
        <p><input id="emailEdit" type="text" placeholder="Emails"/></p>
        <p>Seperate multiple emails with commas.</p>
        <p><input id="address1Edit" type="text" placeholder="House # and Street"/></p>
        <p><input id="address2Edit" type="text" placeholder="City and State" defaultValue="Palo Alto, CA"/></p>
        <p><input id="home" type="text" placeholder="Home Phone"/></p>
        <p><input id="motherCell" type="text" placeholder="Mother's Cell"/></p>
        <p><input id="fatherCell" type="text" placeholder="Father's Cell"/></p>
        <p><input id="studentCell" type="text" placeholder="Student's Cell"/></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-primary" onClick={this.addClient}>Submit</button></p>
      </div>);
  }
});