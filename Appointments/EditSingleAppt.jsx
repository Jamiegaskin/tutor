EditSingleAppt = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    var currentUser = Meteor.user().username;
    var appt = Appts.findOne({_id: StateVars.findOne({user: currentUser}).editID});
    return {
      student: appt.student,
      hours: appt.hours,
      ap: appt.ap,
      phd: appt.phd,
      travel: appt.travel,
      cancel: appt.cancel
    }
  },
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    var students = [];
    var clients = Clients.find();
    var thisClient = Clients.findOne({students: this.state.student});
    clients.map(function(client) {
      if (Rates.findOne({tutor: currentUser, parents: client.parents})) {
        students = students.concat(client.students);
      }
    })
    var editID = StateVars.findOne({user: currentUser}).editID;
    return {
      editID: editID,
      thisAppt: Appts.findOne({_id: editID}),
      thisClient: thisClient,
      adjustments: Adjustments.findOne(),
      students: students,
      clients: clients,
      pay: Meteor.user().profile.pay,
    };
  },
  enterAppt: function() {
    tutor = Meteor.user().username;
    client = document.getElementById("clientEdit").value;
    clientID = Clients.findOne({parents: client})._id
    date = document.getElementById("dateEdit").value;
    subject = document.getElementById("subjectEdit").value;
    hours = this.state.hours;
    travel = this.state.travel;
    ap = this.state.ap;
    phd = this.state.phd;
    notes = document.getElementById("notesEdit").value;
    comments = document.getElementById("commentsEdit").value;
    Meteor.call("editApptTutor", this.data.editID, tutor, clientID, this.state.student, date, subject, hours, travel, ap, phd, cancel, notes, comments);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "apptView");
  },
  getToday: function() {
    var today = new Date();
    var todayAdjust = new Date(today.getTime() - today.getTimezoneOffset()*60000);
    var todayStr = todayAdjust.toISOString().substr(0,10);
    return todayStr;
  },
  handleClient: function(event) {
    this.setState({student: event.target.value});
  },
  handleHours: function(event) {
    this.setState({hours: parseFloat(event.target.value)});
  },
  handleTravel: function(event) {
    this.setState({travel: event.target.checked})
  },
  handleAP: function(event) {
    this.setState({ap: event.target.checked})
  },
  handlePHD: function(event) {
    this.setState({phd: event.target.checked})
  },
  handleCancel: function(event) {
    this.setState({cancel: event.target.value});
  },
  deleteAppt: function() {
    if (window.confirm("Are you sure you want to delete this appointment?")) { 
      Meteor.call("deleteAppt", this.data.editID);
      this.exit();
    }
  },
  render: function() {
    var appt = this.data.thisAppt;
    var pay = this.data.pay;
    var cancel = (this.state.cancel === "B" || this.data.numA > 1 || this.state.cancel === "kept")? 1:0;
    var totalPay = cancel*((pay.base + (this.state.ap? pay.ap:0) + (this.state.phd? pay.phd:0)) * this.state.hours + (this.state.travel? pay.travel:0));
    return (
      <div>
        
        <p>Student: <input id="clientEdit" defaultValue={appt.student} list="studentList" onChange={this.handleClient}>
            <datalist id="studentList" >
              {this.data.students.map(function(student) {
                return <option value={student}/>
              })}
            </datalist>
          </input>
        </p> 
        <p>Date: <input id="dateEdit" type="date" defaultValue={appt.date} /></p>
        <p>Subject: <input id="subjectEdit" type="text" defaultValue={appt.subject} /></p>
        <p>Hours: <select id="hoursEdit" defaultValue={appt.hours} onChange={this.handleHours}>
            <option value=".75">45 minutes</option>
            <option value="1">1 hour</option>
            <option value="1.25">1 hour and 15 minutes</option>
            <option value = "1.5">1 hour and 30 minutes</option>
            <option value = "1.75">1 hour and 45 minutes</option>
            <option value="2">2 hours</option>
          </select>
        </p>
        <p>Travel <input id="travelEdit" type="checkbox" checked={this.state.travel} onChange={this.handleTravel}/></p>
        <p>AP <input id="apEdit" type="checkbox" checked={this.state.ap} onChange={this.handleAP}/></p>
        <p>PhD <input id="phdEdit" type="checkbox" checked={this.state.phd} onChange={this.handlePHD}/></p>
        <p>Cancellation <select id="cancel" defaultValue={appt.cancel} onChange={this.handleCancel}>
            <option value="kept">Appointment kept</option>
            <option value="A">A) 24 Hours notice given. Two per semester at no charge</option>
            <option value="B">B) 24 Hours notice not given or failed appointment</option>
            <option value="C">C) Sudden or severe illness</option>
            <option value="D">D) School Vacation</option>
          </select>
        </p>
        <p>Pay: ${totalPay.toFixed(2)}</p>
        <p>Notes:<br/><textarea id="notesEdit" defaultValue={appt.notes}/></p>
        <p>Comments:<br/><textarea id="commentsEdit" defaultValue={appt.comments}/></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-default" onClick={this.deleteAppt}>Delete</button>
          <button className="btn btn-raised btn-primary" onClick={this.enterAppt}>Submit</button></p>

      </div>);
  }
});