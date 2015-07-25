SingleApptTutor = ReactMeteor.createClass({
  startMeteorSubscriptions: function() {
    Meteor.subscribe("appts")
  },
  getMeteorState: function() {
    return {
      thisAppt: Appts.findOne({_id: this.props.thisID}),
    };
  },
  render: function() {
    var appt = this.state.thisAppt;
    return <li key={appt._id}>Client: {appt.client},
                              Subject: {appt.subject},
                              Notes: {appt.notes},
                              Comments: {appt.comments},
                              Travel: {appt.travel? "Yes":"No"},
                              AP: {appt.ap? "Yes":"No"},
                              PhD: {appt.phd? "Yes":"No"},
                              Pay: {appt.tutorPay}
                              <button onClick={this.props.enterEditMode}>Edit</button>
          </li>;
  }
});