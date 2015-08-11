ApptListMaster = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
  	return {sort: "date"} 
  },
  getMeteorData: function() {
    return {
      appts: Appts.find(),
    };
  },
  render: function() {
	  return (
      <div>
        <h1>Appointments</h1>
  	    <ul>
  	      {this.data.appts.map(function(appt){
  	        return <SingleApptMaster thisID = {appt._id} />;
  	      })}
  	    </ul>
      </div>
	    );
	}
  });