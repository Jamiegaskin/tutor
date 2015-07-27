Global = ReactMeteor.createClass({
	startMeteorSubscriptions: function() {
    Meteor.subscribe("appts");
    Meteor.subscribe("rates");
    Meteor.subscribe("adjustments");
    Meteor.subscribe("pays")
    Meteor.subscribe("stateVars");
  },
  getMeteorState: function() {
    var currentUser = "Jamie Gaskin"; // change later to get logged in user
    return {
      appts: Appts.find().fetch(),
      session: StateVars.findOne({user: currentUser}),
      editMode: StateVars.findOne({user: currentUser}).editMode
    };
  },
  render: function() {
    var editMode = this.state.editMode;
    console.log(editMode);
    if (editMode) {
      return <SingleApptEdit thisID = {this.state.session.editID} />;
    } else {
      return (
        <div>
          It is working!
          {this.state.appts.map(function(appt){
            return <SingleApptTutor thisID = {appt._id} />;
          })}
        </div>
        );
    }
  }
});