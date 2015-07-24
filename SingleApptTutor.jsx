var SingleApptTutor = ReactMeteor.createClass({
  startMeteorSubscriptions: function() {
    Meteor.subscribe("appts")
  },
  getMeteorState: function() {
    return {
      thisAppt: Appts.findOne({_id: this.props.thisId}),
    };
  },
  render: function() {
    appt = this.state.thisAppt;
    return <li key={appt._id}>Tutee: {appt.tutee},
                              Subject: {appt.subject},
                              Notes: {appt.notes},
                              Comments: {appt.comments},
                              Travel: {appt.travel? "Yes":"No"},
                              AP: {appt.ap? "Yes":"No"},
                              PhD: {appt.phd? "Yes":"No"},
                              Pay: {appt.tutorPay}
                              <button onClick={this.props.toggleEditMode}>Edit</button>
          </li>;
  }
});

export default SingleApptTutor;