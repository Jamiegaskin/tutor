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
	    	<h1>Manage Tutors</h1>
	    	<h2>Tutors</h2>
	    	<ul>
	             {this.data.tutors.map(function(tutor){
		      	    if (tutor.profile.status === "Admin"){
				      return;
				    }
			        return <SingleTutorView thisID = {tutor._id} />;
			      })}
             </ul>
		      <h2>Admins</h2>
		      <ul>
			      {this.data.tutors.map(function(tutor){
		      	    if (tutor.profile.status === "Admin"){
				      return <li>{tutor.username}</li>
				    }
			      })}
		      </ul>
	    </div>
	    );
	}
  });