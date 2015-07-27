SingleApptMaster = ReactMeteor.createClass({
  startMeteorSubscriptions: function() {
    Meteor.subscribe("appts");
    Meteor.subscribe("rates");
    Meteor.subscribe("adjustments");
    Meteor.subscribe("pays")
    Meteor.subscribe("stateVars");
  },
  getMeteorState: function() {
    return {
      thisAppt: Appts.findOne({_id: this.props.thisID}),
      baseRate: Rates.findOne({tutor: thisAppt.tutor, client: thisAppt.client}).rate
    };
  },
  enterEditMode: function() {
    var currentUser = "Jamie Gaskin"; //update later to get logged in user
    stateVars.update({name: currentUser}, {editMode: true, editID: this.props.thisID})

  },
  render: function() {
    appt = this.state.thisAppt;
    return <li key={appt._id}>Tutor: {appt.tutor},
                              Tutee: {appt.tutee},
                              Subject: {appt.subject},
                              Notes: {appt.notes},
                              Comments: {appt.comments},
                              Travel: {appt.travel? "Yes":"No"},
                              AP: {appt.ap? "Yes":"No"},
                              PhD: {appt.phd? "Yes":"No"},
                              Base Rate: {this.state.baseRate},
                              Client Bill: {this.state.baseRate + (appt.phd? 10:0)},
                              Tutor Pay: {appt.tutorPay},
                              Profit: {appt.bill - appt.tutorPay}
                              <button onClick={this.enterEditMode}>Edit</button>
          </li>;
  }
});