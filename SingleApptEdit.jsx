SingleApptEdit = ReactMeteor.createClass({
	startMeteorSubscriptions: function() {
    Meteor.subscribe("appts");
  },
  getMeteorState: function() {
    var currentUser = "Jamie Gaskin" // change to get logged in user
    return {
      thisAppt: Appts.findOne({_id: this.props.thisID}),
      userID: StateVars.findOne({user: currentUser})._id
    };
  },
  editAppt: function() {
    var client = document.getElementById("clientEdit").value;
    var date = document.getElementById("dateEdit").value;
    var subject = document.getElementById("subjectEdit").value;
    var travel = document.getElementById("travelEdit").checked;
    var ap = document.getElementById("apEdit").checked;
    var phd = document.getElementById("phdEdit").checked;
    var notes = document.getElementById("notesEdit").value;
    var comments = document.getElementById("commentsEdit").value;
    Appts.update(this.state.thisAppt._id, {$set: {
                                          client: client, 
                                          date: date, 
                                          subject: subject, 
                                          travel: travel, 
                                          ap: ap, 
                                          phd: phd, 
                                          notes: notes, 
                                          comments: comments}});
    this.exitEditMode();
  },
  exitEditMode: function() {
    StateVars.update(this.state.userID, {$set: {editMode: false}});
  },
  render: function() {
    appt = this.state.thisAppt;
    return (
      <div key={appt._id}>
        Client <input id='clientEdit' type="text" value = {appt.client}/>,
        Date <input id='dateEdit' type="text" value = {appt.date}/>,
        Subject <input id='subjectEdit' type="text" value = {appt.subject}/>,
        Travel <input id='travelEdit' type="checkbox" checked = {appt.travel}/>,
        AP <input id='apEdit' type="checkbox" checked = {appt.ap}/>,
        PhD <input id='phdEdit' type="checkbox" checked = {appt.phd}/>,
        Notes <input id='notesEdit' type="text" value = {appt.notes}/>,
        Comments <input id='commentsEdit' type="text" value = {appt.comments}/>
        <button onClick={this.editAppt}>submit</button>
        <button onClick={this.exitEditMode}>cancel</button>
      </div>);
  }
});