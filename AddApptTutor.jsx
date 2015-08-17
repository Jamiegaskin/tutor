AddApptTutor = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
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
    var clients = Clients.find();
    var thisClient = Clients.findOne({students: this.state.student});
    clients.map(function(client) {
      if (Rates.findOne({tutor: currentUser, parents: client.parents})) {
        students = students.concat(client.students);
      }
    })
    return {
      thisClient: thisClient,
      adjustments: Adjustments.findOne(),
      students: students,
      clients: clients,
      pay: Meteor.user().profile.pay,
    };
  },
  enterAppt: function() {
    tutor = Meteor.user().username;
    date = document.getElementById("dateEdit").value;
    subject = document.getElementById("subjectEdit").value;
    hours = this.state.hours;
    travel = this.state.travel;
    ap = this.state.ap;
    phd = this.state.phd;
    notes = document.getElementById("notesEdit").value;
    comments = document.getElementById("commentsEdit").value;
    Meteor.call("addAppt", tutor, this.state.student, date, subject, hours, travel, ap, phd, notes, comments);
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
  render: function() {
    var pay = this.data.pay;
    var totalPay = pay.base * this.state.hours + (this.state.ap? pay.ap:0) + (this.state.phd? pay.phd:0) + (this.state.travel? pay.travel:0);
    return (
      <div>
        <h1>Add Appointment</h1>
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
        <p>Pay: ${totalPay.toFixed(2)}</p>
        <p><textarea id="notesEdit" placeholder="Material Covered"/></p>
        <p><textarea id="commentsEdit" placeholder="Comments for Jenn (optional)"/></p>
        <p><button onClick={this.exit}>cancel</button>
          <button onClick={this.enterAppt}>submit</button></p>

      </div>);
  }
});