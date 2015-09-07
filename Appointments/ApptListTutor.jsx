ApptListTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      appts: Appts.find({tutor: Meteor.user().username}, {sort:{date: -1}}),
    };
  },
  addAppt: function() {
    Meteor.call("setMode", "addAppt");
  },
  render: function() {
    return (
      <div>
        
        <button className="btn btn-raised" onClick={this.addAppt}>Add Another Appointment</button>
        <p>Pay, as of now, does not accurately reflect type A cancellations, but is calculated correctly in bills and pay stubs</p>
        <table data-toggle="table" className="table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Material Covered</th>
                    <th>Comments</th>
                    <th>Travel</th>
                    <th>AP</th>
                    <th>PhD</th>
                    <th>Cancel</th>
                    <th>Pay</th>
                    <th>Edit</th>
                </tr>
            </thead>
              {this.data.appts.map(function(appt){
                return <SingleApptTutor key={appt._id} thisID = {appt._id} />;
              })}
        </table>
      </div>
      );
  }
  });