MonitorState = ReactMeteor.createClass({
	startMeteorSubscriptions: function() {
    Meteor.subscribe("stateVars");
  },
  getMeteorState: function() {
    var currentUser = "Jamie Gaskin"; // change later to get logged in user
    return {
      session: StateVars.findOne({user: currentUser})
    };
  },
  render: function() {
    return (
      <div>
        User: {this.state.session.user}, EditMode: {this.state.session.editMode? "yes":"no"}, EditID: {this.state.session.editID}
      </div>
      );
  }
});