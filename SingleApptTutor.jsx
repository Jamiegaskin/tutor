SingleApptTutor = ReactMeteor.createClass({
  startMeteorSubscriptions: function() {
    Meteor.subscribe("appts");
    Meteor.subscribe("rates");
    Meteor.subscribe("adjustments");
    Meteor.subscribe("stateVars");
  },
  getMeteorState: function() {
    return {
      thisAppt: Appts.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    var currentUser = StateVars.findOne({user: "Jamie Gaskin"})._id; //update later to get logged in user
    StateVars.update(currentUser, {$set:{editMode: true, editID: this.props.thisID}});
  },
  render: function() {
    var appt = this.state.thisAppt;
    return <li key={appt._id}>Client: {appt.client},
                              Subject: {appt.subject},
                              Date: {appt.date},
                              Notes: {appt.notes},
                              Comments: {appt.comments},
                              Travel: {appt.travel? "Yes":"No"},
                              AP: {appt.ap? "Yes":"No"},
                              PhD: {appt.phd? "Yes":"No"},
                              Pay: {appt.pay}
                              <button onClick={this.enterEditMode}>Edit</button>
          </li>;
  }
});