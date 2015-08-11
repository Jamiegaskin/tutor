RouterMaster = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      userID: StateVars.findOne({user: currentUser})._id,
      currentPage: StateVars.findOne({user: currentUser}).mode
    };
  },
  select: function(event) {
    var value = event.target.value;
    if (value === "logout"){
      Meteor.logout()
      return;
    }
    else if (value === "nav") {
      return;
    }
    StateVars.update(this.data.userID, {$set: {mode: value}});
  },
  render: function() {
    return (
      <select onChange={this.select} value="nav">
        <option value="nav">Navigation</option>
        <option value="addAppt">Add Appointment</option>
        <option value="apptView">Appointment List</option>
        <option value="addPay">Add Payment</option>
        <option value="addRate">Add Rate</option>
        <option value="manageRates">Manage Rates</option>
        <option value="addClient">Add Client</option>
        <option value="manageClients">Manage Clients</option>
        <option value="addTutor">Add Tutor</option>
        <option value="manageTutors">Manage Tutors</option>
        <option value="editPass">Edit Password</option>
        <option value="logout">Log Out</option>
      </select>);
  }
});