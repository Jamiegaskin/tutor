// shows various state variables for debugging
MonitorState = React.createClass({
  mixins: [ReactMeteorData], 
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      session: StateVars.findOne({user: currentUser})
    };
  },
  render: function() {
    if (this.data.session) {
      return (
        <div>
          User: {this.data.session.user}, Mode: {this.data.session.mode}, EditID: {this.data.session.editID}, Master: {Meteor.user().profile.master? "Yes":"No"}
        </div>
        );
    }
    else {
      return <div>no user</div>;
    }
  }
});