AddApptMaster = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      tutor: (Meteor.user().profile.status === "Admin"? "Jenn Gaskin":Meteor.user().username),
      student: "",
      hours: 1,
      ap: false,
      phd: false,
      travel: false,
      cancel: "kept"
    }
  },
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    var students = [];
    var tutor = this.state.tutor;
    var clients = Clients.find();
    var thisClient = Clients.findOne({students: this.state.student});
    var rate = thisClient? Rates.findOne({tutor: tutor, parents: thisClient.parents}):undefined;
    clients.map(function(client) {
      if (Rates.findOne({tutor: tutor, parents: client.parents})) {
        students = students.concat(client.students);
      }
    })
    return {
      adjustments: Adjustments.findOne(),
      students: students,
      clients: clients,
      users: Meteor.users.find(),
      pay: Meteor.users.findOne({username: tutor}).profile.pay,
      billBase: rate? rate.rate:0,
      numA: this.calcNumA()
    };
  },
  enterAppt: function() {
    var tutor = document.getElementById("tutorEdit").value;
    var student = document.getElementById("clientEdit").value;
    var clientID = Clients.findOne({students: student})._id;
    var date = document.getElementById("dateEdit").value;
    var subject = document.getElementById("subjectEdit").value;
    var hours = this.state.hours;
    var travel = this.state.travel;
    var ap = this.state.ap;
    var phd = this.state.phd;
    var cancel = this.state.cancel;
    var notes = document.getElementById("notesEdit").value;
    var comments = document.getElementById("commentsEdit").value;
    Meteor.call("addAppt", tutor, clientID, student, date, subject, hours, travel, ap, phd, cancel, notes, comments);
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
  // calculates the number of A cancelations in the current semester
  calcNumA: function() {
    var springStart = this.getToday().substr(0,4) + "-01-01";
    var springEnd = this.getToday().substr(0,4) + "-06-01";
    var fallStart = this.getToday().substr(0,4) + "-08-01";
    var fallEnd = this.getToday().substr(0,4) + "-12-30";
    if (this.getToday() < fallStart) {
      var sum = Appts.find({student: this.state.student, cancel: "A", date: {$gt: springStart, $lt: springEnd}}).count();
    } else {
      var sum = Appts.find({student: this.state.student, cancel: "A", date: {$gt: fallStart, $lt: fallEnd}}).count();
    }
    return sum;
  },
  handleTutor: function(event) {
    this.setState({tutor: event.target.value});
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
  render: function() {
    var appt = this.data.thisAppt;
    var pay = this.data.pay;
    var cancel = (this.state.cancel === "B" || this.data.numA > 1 || this.state.cancel === "kept")? 1:0;
    var totalPay = ((pay.base + (this.state.ap? pay.ap:0) + (this.state.phd? pay.phd:0)) * this.state.hours + (this.state.travel? pay.travel:0))*cancel;
    var totalBill = ((this.data.billBase + (this.state.ap? this.data.adjustments.ap:0)) * this.state.hours + (this.state.travel? this.data.adjustments.travel:0))*cancel;
    return (
      <div>

        <p>Tutor <select id="tutorEdit" defaultValue={this.state.tutor} onChange={this.handleTutor}>
            {this.data.users.map(function(tutor) {
              if(tutor.profile.status === "Admin") {
                return;
              }
              return <option key={tutor._id}>{tutor.username}</option>;
            })}
          </select>
        </p>
        <p><input id="clientEdit" list="studentList" placeholder="Student" onChange={this.handleClient} />
            <datalist id="studentList">
              {this.data.students.map(function(student) {
                return <option key={student} value={student}/>
              })}
            </datalist>
        </p>
        <p>Date <input id="dateEdit" type="date" defaultValue={this.getToday()} /></p>
        <p><input id="subjectEdit" type="text" placeholder="Subject" /></p>
        <p>Hours <select id="hoursEdit" defaultValue="1" onChange={this.handleHours}>
            <option value=".75">45 minutes</option>
            <option value="1">1 hour</option>
            <option value="1.25">1 hour and 15 minutes</option>
            <option value = "1.5">1 hour and 30 minutes</option>
            <option value = "1.75">1 hour and 45 minutes</option>
            <option value="2">2 hours</option>
          </select>
        </p>
        <p>Travel <input id="travelEdit" type="checkbox" onChange={this.handleTravel}/></p>
        <p>AP <input id="apEdit" type="checkbox" onChange={this.handleAP}/></p>
        <p>PhD <input id="phdEdit" type="checkbox" onChange={this.handlePHD}/></p>
        <p>Cancellation <select id="cancel" defaultValue="kept" onChange={this.handleCancel}>
            <option value="kept">Appointment kept</option>
            <option value="A">A) 24 Hours notice given. Two per semester at no charge</option>
            <option value="B">B) 24 Hours notice not given or failed appointment</option>
            <option value="C">C) Sudden or severe illness</option>
            <option value="D">D) School Vacation</option>
          </select>
        </p>
        <p>Bill: ${totalBill.toFixed(2)}</p>
        <p>Pay: ${totalPay.toFixed(2)}</p>
        <p><textarea id="notesEdit" placeholder="Material Covered"/></p>
        <p><textarea id="commentsEdit" placeholder="Comments"/></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-primary" onClick={this.enterAppt}>Submit</button></p>

      </div>);
  }
});
