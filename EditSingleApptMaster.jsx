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
    var tutor = document.getElementById("tutorEdit").value;
    var student = document.getElementById("clientEdit").value; 
    var clientID = Clients.findOne({students: student})._id
    var date = document.getElementById("dateEdit").value;
    var subject = document.getElementById("subjectEdit").value;
    var hours = parseFloat(document.getElementById("hoursEdit").value);
    var travel = document.getElementById("travelEdit").checked;
    var ap = document.getElementById("apEdit").checked;
    var phd = document.getElementById("phdEdit").checked;
    var cancel = document.getElementById("cancel").value;
    var bill = parseFloat(document.getElementById("billEdit").value);
    var pay = parseFloat(document.getElementById("payEdit").value);
    var notes = document.getElementById("notesEdit").value;
    var comments = document.getElementById("commentsEdit").value;
    Meteor.call("editAppt", this.data.editID, tutor, clientID, student, date, subject, hours, travel, ap, phd, cancel, bill, pay, notes, comments);
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
        <p>Cancellation <select id="cancel" defaultValue={appt.cancel}>
            <option value="kept">Appointment kept</option>
            <option value="A">A) 24 Hours notice given. Two per semester at no charge</option>
            <option value="B">B) 24 Hours notice not given or failed appointment</option>
            <option value="C">C) Sudden or severe illness</option>
            <option value="D">D) School Vacation</option>
          </select>
        </p>
        <p>Bill: $<input id="billEdit" type="text" defaultValue={appt.bill} /></p>
        <p>Pay: $<input id="payEdit" type="text" defaultValue={appt.pay} /></p>
        <p>Notes: <br/><textarea id="notesEdit" defaultValue={appt.notes} /></p>
        <p>Comments: <br/><textarea id="commentsEdit" type="text" defaultValue={appt.comments} /></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>Cancel</button>
          <button className="btn btn-raised btn-default" onClick={this.deleteAppt}>Delete</button>
          <button className="btn btn-raised btn-primary" onClick={this.editAppt}>Submit</button></p>
      </div>);
  }
});