AddCycle = React.createClass({
  addCycle: function() {
    name = document.getElementById("name").value; 
    start = document.getElementById("dateStart").value;
    end = document.getElementById("dateEnd").value;
    Meteor.call("addCycle", name, start, end);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "manageCycles");
  },
  getToday: function() {
    var today = new Date();
    var todayAdjust = new Date(today.getTime() - today.getTimezoneOffset()*60000);
    var todayStr = todayAdjust.toISOString().substr(0,10);
    return todayStr;
  },
  render: function() {
    return (
      <div>
        <h1>Add Billing Cycle</h1>
        <p><input id="name" type="text" placeholder="Name"/></p>
        <p>Start Date <input id="dateStart" type="date" defaultValue={this.getToday()} /></p>
        <p>Start Date <input id="dateEnd" type="date" defaultValue={this.getToday()} /></p>
        <p><button onClick={this.exit}>Cancel</button>
          <button onClick={this.addCycle}>Submit</button></p>
      </div>);
  }
});