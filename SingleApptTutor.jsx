SingleApptTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisAppt: Appts.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    Meteor.call("setModeAndEditID", "editAppt", this.props.thisID);
  },
  render: function() {
    var appt = this.data.thisAppt;
    return <li key={appt._id}>Student: {appt.student},
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