EditTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
  	var thisUser = Meteor.user().username;
  	var session = StateVars.findOne({user: thisUser});
    var editID = session.editID;
    return {
      userID: session._id,
      editID: editID,
      tutor: Meteor.users.findOne({_id: editID})
    };
  },
  editTutor: function() {
	  name = document.getElementById("username").value;
	  email = document.getElementById("email").value;
	  status = document.getElementById("status").value;
	  master = document.getElementById("master").checked; 
	  ap = parseInt(document.getElementById("ap").value);
	  phd = parseInt(document.getElementById("phd").value);
	  travel = parseInt(document.getElementById("travel").value); 
	  base = parseInt(document.getElementById("pay").value);
    Meteor.call("editTutor", this.data.editID, name, email, status, master, base, ap, phd, travel);
  	this.exit();
  },
  exit: function() {
    StateVars.update(this.data.userID, {$set: {mode: "manageTutors"}});
  },
  deleteTutor: function() {
    if (window.confirm("Are you sure you want to delete this tutor?")) { 
      Meteor.call("deleteTutor", this.data.editID);
      this.exit();
    }
  },
  render: function() {
    var tutor = this.data.tutor;
    return (
    <div>
        <p>Name: <input type="text" id="username" defaultValue={tutor.username} /></p>
        <p>Email: <input type="text" id="email" defaultValue={tutor.emails[0].address}/></p>
        <p>Status: <select id="status" defaultValue={tutor.profile.status}>
              <option>Associate</option>
              <option>Senior</option>
              <option>Founder</option>
              <option>Admin</option>
            </select>
        </p>
        <p>Pay: $<input type="text" id="pay" defaultValue={tutor.profile.pay.base} /></p>
        <p>Extra for AP: $<input type="text" id="ap" defaultValue={tutor.profile.pay.ap} /></p>
        <p>Extra for PhD: $<input type="text" id="phd" defaultValue={tutor.profile.pay.phd}  /></p>
        <p>Extra for Travel: $<input type="text" id="travel" defaultValue={tutor.profile.pay.travel}  /></p>
        <p>Master Account <input type="checkbox" id="master" checked={tutor.profile.master} /></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>Cancel</button>
          <button className="btn btn-raised btn-default" onClick={this.deleteTutor}>Delete</button>
          <button className="btn btn-raised btn-primary" onClick={this.editTutor}>Submit</button></p>
      </div>);
  }
});