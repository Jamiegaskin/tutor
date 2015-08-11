RouterTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    var currentSession = StateVars.findOne({user: currentUser});
    return {
      userID: currentSession._id,
      currentPage: currentSession.mode
    };
  },
  select: function(event) {
    var value = event.target.value;
    if (value === "logout"){
      Meteor.logout()
      return;
    }
    StateVars.update(this.data.userID, {$set: {mode: value}});
  },
  render: function() {
    return (
      <select onChange={this.select} defaultValue={this.data.currentPage}>
        <option value="addAppt">Add Appointment</option>
        <option value="apptView">Appointment List</option>
        <option value="editPass">Edit Password</option>
        <option value="logout">Log Out</option>
      </select>);
  }
});