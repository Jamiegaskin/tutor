RouterTutor = React.createClass({
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
    Meteor.call("setMode", value);
  },
  render: function() {
    return (
      <select onChange={this.select} value="nav">
        <option value="nav">Navigation</option>
        <option value="addAppt">Add Appointment</option>
        <option value="apptView">Appointment List</option>
        <option value="editPass">Edit Password</option>
        <option value="logout">Log Out</option>
      </select>);
  }
});