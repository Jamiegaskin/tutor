AddApptMaster = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      tutor: (Meteor.user().profile.status === "Admin"? "Jenn Gaskin":Meteor.user().username),
      student: "",
      hours: 1,
      ap: false,
      phd: false,
      travel: false
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
    };
  },
  enterAppt: function() {
    tutor = document.getElementById("tutorEdit").value;
    client = document.getElementById("clientEdit").value; 
    date = document.getElementById("dateEdit").value;
    subject = document.getElementById("subjectEdit").value;
    hours = this.state.hours;
    travel = this.state.travel;
    ap = this.state.ap;
    phd = this.state.phd;
    notes = document.getElementById("notesEdit").value;
    comments = document.getElementById("commentsEdit").value;
    Meteor.call("addAppt", tutor, client, date, subject, hours, travel, ap, phd, notes, comments);
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
  render: function() {
    var appt = this.data.thisAppt;
    var pay = this.data.pay;
    var totalPay = pay.base * this.state.hours + (this.state.ap? pay.ap:0) + (this.state.phd? pay.phd:0) + (this.state.travel? pay.travel:0);
    var totalBill = this.data.billBase*this.state.hours + (this.state.ap? this.data.adjustments.ap:0) + (this.state.travel? this.data.adjustments.travel:0);
    return (
      <div>
        <h1>Add Appointment</h1>
        <p>Tutor <select id="tutorEdit" defaultValue={this.state.tutor} onChange={this.handleTutor}>
            {this.data.users.map(function(tutor) {
              if(tutor.profile.status === "Admin") {
                return;
              }
              return <option>{tutor.username}</option>;
            })}
          </select>
        </p>
        <p><input id="clientEdit" list="studentList" placeholder="Student" onChange={this.handleClient}>
            <datalist id="studentList">
              {this.data.students.map(function(student) {
                return <option value={student}/>
              })}
            </datalist>
          </input>
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
        <p>Bill: ${totalBill.toFixed(2)}</p>
        <p>Pay: ${totalPay.toFixed(2)}</p>
        <p><textarea id="notesEdit" placeholder="Notes"/></p>
        <p><textarea id="commentsEdit" placeholder="Comments"/></p>
        <p><button onClick={this.exit}>cancel</button>
          <button onClick={this.enterAppt}>submit</button></p>

      </div>);
  }
});