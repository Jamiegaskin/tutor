EditSingleApptMaster = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    var editID = StateVars.findOne({user: currentUser}).editID
    var students = [];
    var clients = Clients.find();
    clients.map(function(client) {
      students = students.concat(client.students);
    })
    return {
      users: Meteor.users.find(),
      students: students,
      thisAppt: Appts.findOne({_id: editID}),
      editID: editID,
    };
  },
  editAppt: function() {
    tutor = document.getElementById("tutorEdit").value;
    client = document.getElementById("clientEdit").value; 
    date = document.getElementById("dateEdit").value;
    subject = document.getElementById("subjectEdit").value;
    hours = parseFloat(document.getElementById("hoursEdit").value);
    travel = document.getElementById("travelEdit").checked;
    ap = document.getElementById("apEdit").checked;
    phd = document.getElementById("phdEdit").checked
    bill = parseFloat(document.getElementById("billEdit").value);
    pay = parseFloat(document.getElementById("payEdit").value);
    notes = document.getElementById("notesEdit").value;
    comments = document.getElementById("commentsEdit").value;
    Meteor.call("editAppt", this.data.editID, tutor, client, date, subject, hours, travel, ap, phd, bill, pay, notes, comments);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "apptView");
  },
  deleteAppt: function() {
    if (window.confirm("Are you sure you want to delete this appointment?")) { 
      Meteor.call("deleteAppt", this.data.editID);
      this.exit();
    }
  },
  render: function() {
    var appt = this.data.thisAppt;
    return (
      <div>
        <p>Tutor <select id="tutorEdit" defaultValue={appt.tutor}>
            {this.data.users.map(function(tutor) {
              if(tutor.profile.status === "Admin") {
                return;
              }
              return <option>{tutor.username}</option>;
            })}
          </select>
        </p>
        <p><input id="clientEdit" list="studentList" defaultValue={appt.student}>
            <datalist id="studentList">
              {this.data.students.map(function(student) {
                return <option value={student}/>
              })}
            </datalist>
          </input>
        </p> 
        <p>Date <input id="dateEdit" type="date" defaultValue={appt.date} /></p>
        <p>Hours <select id="hoursEdit" defaultValue="1" defaultValue={appt.hours}>
            <option value=".75">45 minutes</option>
            <option value="1">1 hour</option>
            <option value="1.25">1 hour and 15 minutes</option>
            <option value = "1.5">1 hour and 30 minutes</option>
            <option value = "1.75">1 hour and 45 minutes</option>
            <option value="2">2 hours</option>
          </select>
        </p>
        <p>Subject: <input id="subjectEdit" type="text" defaultValue={appt.subject} /></p>
        <p>Travel: <input id="travelEdit" type="checkbox" defaultChecked={appt.travel} /></p>
        <p>AP: <input id="apEdit" type="checkbox" defaultChecked={appt.ap} /></p>
        <p>PhD: <input id="phdEdit" type="checkbox" defaultChecked={appt.phd} /></p>
        <p>Bill: $<input id="billEdit" type="text" defaultValue={appt.bill} /></p>
        <p>Pay: $<input id="payEdit" type="text" defaultValue={appt.pay} /></p>
        <p>Notes: <br/><textarea id="notesEdit" defaultValue={appt.notes} /></p>
        <p>Comments: <br/><textarea id="commentsEdit" type="text" defaultValue={appt.comments} /></p>
        <p><button onClick={this.exit}>Cancel</button>
          <button onClick={this.deleteAppt}>Delete</button>
          <button onClick={this.editAppt}>Submit</button></p>
      </div>);
  }
});