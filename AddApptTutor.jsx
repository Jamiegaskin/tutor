AddApptTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      userID: StateVars.findOne({user: currentUser})._id,
      user: currentUser
    };
  },
  enterAppt: function() {
    Appts.insert({tutor: this.data.user,
                  client: document.getElementById("clientEdit").value, 
                  date: document.getElementById("dateEdit").value, 
                  subject: document.getElementById("subjectEdit").value, 
                  travel: document.getElementById("travelEdit").checked, 
                  ap: document.getElementById("apEdit").checked,
                  phd: document.getElementById("phdEdit").checked, 
                  notes: document.getElementById("notesEdit").value, 
                  comments: document.getElementById("commentsEdit").value});
    this.exit();
  },
  exit: function() {
    StateVars.update(this.data.userID, {$set: {mode: "apptView"}});
  },
  getTodayString: function() {
    var today = new Date();
    return today.toISOString().substr(0,10);
  },
  render: function() {
    var appt = this.data.thisAppt;
    return (
      <div>
        <p>Client <input id="clientEdit" type="text" /></p>
        <p>Date <input id="dateEdit" type="date" defaultValue={this.getTodayString()} /></p>
        <p>Subject <input id="subjectEdit" type="text" /></p>
        <p>Travel <input id="travelEdit" type="checkbox" /></p>
        <p>AP <input id="apEdit" type="checkbox" /></p>
        <p>PhD <input id="phdEdit" type="checkbox" /></p>
        <p>Notes <input id="notesEdit" type="text" /></p>
        <p>Comments <input id="commentsEdit" type="text" /></p>
        <p><button onClick={this.exit}>cancel</button>
          <button onClick={this.enterAppt}>submit</button></p>
      </div>);
  }
});