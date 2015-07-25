SingleApptEdit = ReactMeteor.createClass({
	startMeteorSubscriptions: function() {
    Meteor.subscribe("appts")
  },
  getMeteorState: function() {
    return {
      thisAppt: Appts.findOne({_id: this.props.thisId}),
    };
  },
  editAppt: function() {
    var client = document.getElementByID("clientEdit").value;
    var date = document.getElementByID("dateEdit").value;
    var subject = document.getElementByID("subjectEdit").value;
    var travel = document.getElementByID("travelEdit").checked;
    var ap = document.getElementByID("apEdit").checked;
    var phd = document.getElementByID("phdEdit").checked;
    var notes = document.getElementByID("notesEdit").value;
    var comments = document.getElementByID("commentsEdit").value;
    Appts.update(this.state.thisAppt._id, {client: client, 
                                          date: date, 
                                          subject: subject, 
                                          travel: travel, 
                                          ap: ap, 
                                          phd: phd, 
                                          notes: notes, 
                                          comments: comments});
    this.props.exitEditMode();
  },
  render: function() {
    appt = this.state.thisAppt;
    return (
      <div key={appt._id}>
        <input id='clientEdit' type="text" value = {appt.client}/>;
        <input id='dateEdit' type="text" value = {appt.date}/>;
        <input id='subjectEdit' type="text" value = {appt.subject}/>;
        <input id='travelEdit' type="checkbox" checked = {appt.travel}/>;
        <input id='apEdit' type="checkbox" checked = {appt.ap}/>;
        <input id='phdEdit' type="checkbox" checked = {appt.phd}/>;
        <input id='notesEdit' type="text" value = {appt.notes}/>;
        <input id='commentsEdit' type="text" value = {appt.comments}/>;
        <button onClick={this.editAppt}>submit</button>
        <button onClick={this.props.exitEditMode}>cancel</button>
      </div>);
  }
});