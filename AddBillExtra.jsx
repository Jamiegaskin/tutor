AddBillExtra = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      clients: Clients.find(),
      cycles: Cycles.find()
    };
  },
  addBillExtra: function() {
    var clientParents = document.getElementById("parent").value;
    var amount = parseFloat(document.getElementById("amount").value);
    var occasion = document.getElementById("occasion").value;
    var cycleName = document.getElementById("cycle").value;
    var cycle = Cycles.findOne({name: cycleName});
    var client = Clients.findOne({parents: clientParents});
    Meteor.call("addBillExtra", client, cycle, occasion, amount);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "manageBillExtra");
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
        <h1>Add Bill Extra</h1>
        <p><input id="parent" list="parentList" placeholder="Client">
            <datalist id="parentList">
              {this.data.clients.map(function(client) {
                return <option value={client.parents}/>
              })}
            </datalist>
          </input>
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
        <p><button onClick={this.exit}>cancel</button>
          <button onClick={this.addBillExtra}>submit</button></p>
      </div>);
  }
});