// shows various state variables for debugging
MonitorState = React.createClass({
  mixins: [ReactMeteorData], 
  getMeteorData: function() {
    var currentUser = "Jamie Gaskin"; // change later to get logged in user 
    return {
      session: StateVars.findOne({user: currentUser})
    };
  },
  render: function() {
    return (
      <div>
        User: {this.data.session.user}, mode: {this.data.session.mode}, EditID: {this.data.session.editID}, Master: {Meteor.user().profile.master? "Yes":"No"}
      </div>
      );
  }
});