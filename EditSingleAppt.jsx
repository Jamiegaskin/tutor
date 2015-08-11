EditSingleAppt = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = "Jamie Gaskin" // change to get logged in user
    var appt = Appts.findOne({_id: this.props.thisID})
    return {
      thisAppt: appt,
      userID: StateVars.findOne({user: currentUser})._id,
    };
  },
  editAppt: function() {
    Appts.update(this.data.thisAppt._id, {$set: {
                                          client: document.getElementById("clientEdit").value, 
                                          date: document.getElementById("dateEdit").value, 
                                          subject: document.getElementById("subjectEdit").value, 
                                          travel: document.getElementById("travelEdit").checked, 
                                          ap: document.getElementById("apEdit").checked,
                                          phd: document.getElementById("phdEdit").checked, 
                                          notes: document.getElementById("notesEdit").value, 
                                          comments: document.getElementById("commentsEdit").value}});
    this.exitEditMode();
  },
  exitEditMode: function() {
    StateVars.update(this.data.userID, {$set: {mode: "apptView"}});
  },
  render: function() {
    var appt = this.data.thisAppt;
    return (
      <form>
        Client <input id="clientEdit" type="text" defaultValue={appt.client} />,
        Date <input id="dateEdit" type="date" defaultValue={appt.date} />,
        Subject <input id="subjectEdit" type="text" defaultValue={appt.subject} />,
        Travel <input id="travelEdit" type="checkbox" defaultChecked={appt.travel} />,
        AP <input id="apEdit" type="checkbox" defaultChecked={appt.ap} />,
        PhD <input id="phdEdit" type="checkbox" defaultChecked={appt.phd} />,
        Notes <input id="notesEdit" type="text" defaultValue={appt.notes} />,
        Comments <input id="commentsEdit" type="text" defaultValue={appt.comments} />
        <button onClick={this.editAppt}>submit</button>
        <button onClick={this.exitEditMode}>cancel</button>
      </form>);
  }
});