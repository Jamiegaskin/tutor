AddPayExtra = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      users: Meteor.users.find(),
      cycles: Cycles.find()
    };
  },
  addPayExtra: function() {
    var tutor = document.getElementById("tutorEdit").value;
    var tutorID = Meteor.users.findOne({username: tutor})._id;
    var amount = parseFloat(document.getElementById("amount").value);
    var occasion = document.getElementById("occasion").value;
    var cycleName = document.getElementById("cycle").value;
    var cycleID = Cycles.findOne({name: cycleName})._id;
    Meteor.call("addPayExtra", tutorID, cycleID, occasion, amount);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "managePayExtra");
  },
  getToday: function() {
    var today = new Date();
    var todayAdjust = new Date(today.getTime() - today.getTimezoneOffset()*60000);
    var todayStr = todayAdjust.toISOString().substr(0,10);
    return todayStr;
  },
  render: function() {
    var today = this.getToday();
    var currentCycle = Cycles.findOne({start: {$lt: today}, end: {$gt: today}}).name;
    return (
      <div>
        
        <p>Tutor <select id="tutorEdit">
            {this.data.users.map(function(tutor) {
              if(tutor.profile.status === "Admin") {
                return;
              }
              return <option>{tutor.username}</option>;
            })}
          </select>
        </p>
         <p>Cycle <input id="cycle" list="cycleList" defaultValue={currentCycle}>
            <datalist id="cycleList">
              {this.data.cycles.map(function(cycle) {
                return <option value={cycle.name}/>
              })}
            </datalist>
          </input>
        </p> 
        <p><input id="occasion" type="text" placeholder="Occasion"/></p>
        <p>$<input id="amount" type="text" placeholder="Amount"/></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-primary" onClick={this.addPayExtra}>Submit</button></p>
      </div>);
  }
});