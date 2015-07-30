ApptListTutor = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
  	return {sort: "date"} 
  },
  getMeteorData: function() {
    var currentUser = "Jamie Gaskin"; // change later to get logged in user
    return {
      appts: Appts.find({tutor: currentUser}),
    };
  },
  render: function() {
	  return (
	    <div>
	      {this.data.appts.map(function(appt){
	        return <SingleApptTutor thisID = {appt._id} />;
	      })}
	    </div>
	    );
	}
  });