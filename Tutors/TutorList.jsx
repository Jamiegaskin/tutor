TutorList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      tutors: Meteor.users.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	
	    	<h2>Tutors</h2>
	        <table data-toggle="table" className="table">
	            <thead>
	                <tr>
	                    <th>Tutor</th>
	                    <th>Email</th>
	                    <th>Status</th>
	                    <th>Pay Per Hour</th>
	                    <th>AP Extra</th>
	                    <th>PhD Extra</th>
	                    <th>Travel Extra</th>
	                    <th>Master</th>
	                    <th>Edit</th>
	                </tr>
	            </thead>
	             {this.data.tutors.map(function(tutor){
		      	    if (tutor.profile.status === "Admin"){
				      return;
				    }
			        return <SingleTutorView key={tutor._id} thisID = {tutor._id} />;
			      })}
             </table>
		      <h2>Admins</h2>
		      <ul>
			      {this.data.tutors.map(function(tutor){
		      	    if (tutor.profile.status === "Admin"){
				      return <li key={tutor._id}>{tutor.username}</li>;
				    }
			      })}
		      </ul>
	    </div>
	    );
	}
  });