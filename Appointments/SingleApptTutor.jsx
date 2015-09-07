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
    return <tr>
                <td>{appt.student}</td>
                <td>{appt.subject}</td>
                <td>{appt.date}</td>
                <td>{appt.notes}</td>
                <td>{appt.comments}</td>
                <td>{appt.travel? "yes":"no"}</td>
                <td>{appt.ap? "yes":"no"}</td>
                <td>{appt.phd? "yes":"no"}</td>
                <td>{appt.cancel}</td>
                <td>${appt.pay}</td>
                <td><button className="btn btn-default btn-raised" onClick={this.enterEditMode}>Edit</button></td>
            </tr>;
  }
});
