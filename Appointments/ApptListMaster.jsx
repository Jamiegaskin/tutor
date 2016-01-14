ApptListMaster = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
  	return {sort: "date"} 
  },
  getMeteorData: function() {
    return {
      appts: Appts.find({}, {sort:{date: -1}}),
    };
  },
  addAppt: function() {
    Meteor.call("setMode", "addAppt");
  },
  render: function() {
	  return (
      <div>
        
        <button className="btn btn-default btn-raised" onClick={this.addAppt}>Add Another Appointment</button>
  	    <table data-toggle="table" className="table">
            <thead>
                <tr>
                    <th>Tutor</th>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Material Covered</th>
                    <th>Comments</th>
                    <th>Travel</th>
                    <th>AP</th>
                    <th>PhD</th>
                    <th>Cancel</th>
                    <th>Bill</th>
                    <th>Pay</th>
                    <th>Edit</th>
                </tr>
            </thead>
              {this.data.appts.map(function(appt){
                return <SingleApptMaster key={appt._id} thisID = {appt._id} />;
              })}
        </table>
      </div>
	    );
	}
  });