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
        
        <button onClick={this.addAppt}>Add Another Appointment</button>
        <p>Pay and bill, as of now, do not accurately reflect type A cancellations, but are calculated correctly in bills and pay stubs</p>
  	    <ul>
  	      {this.data.appts.map(function(appt){
  	        return <SingleApptMaster key={appt._id} thisID = {appt._id} />;
  	      })}
  	    </ul>
      </div>
	    );
	}
  });