var Global = ReactMeteor.createClass({
	startMeteorSubscriptions: function() {
    Meteor.subscribe("appts")
  },
  getMeteorState: function() {
    return {
      thisAppt: Appts.find({_id: this.props.thisId}).fetch(),
      editForm: false
    };
  },
  toggleEditMode: function() {
    this.setState({editForm: true});
  },
  editAppt: function() {
    var client = document.getElementByID("clientEdit");
    var date = document.getElementByID("dateEdit");
    var subject = document.getElementByID("subjectEdit");
    var travel = document.getElementByID("travelEdit");
    var ap = document.getElementByID("apEdit");
    var phd = document.getElementByID("phdEdit");
    var notes = document.getElementByID("notesEdit");
    var comments = document.getElementByID("commentsEdit");
    Appts.update(this.state.thisAppt._id, {client: client, 
                                          date: date, 
                                          subject: subject, 
                                          travel: travel, 
                                          ap: ap, 
                                          phd: phd, 
                                          notes: notes, 
                                          comments: comments});
    this.setState({editForm: false});
  }
  render: function() {
    appt = this.state.thisAppt[0];
    return <li key={appt._id}>Tutor: {appt.tutor},
                              Tutee: {appt.tutee},
                              Subject: {appt.subject},
                              Comments: {appt.comments},
                              Travel: {appt.travel? "Yes":"No"}
                              <button onClick={this.toggleEditMode}>edit</button>
          </li>;
  }
});