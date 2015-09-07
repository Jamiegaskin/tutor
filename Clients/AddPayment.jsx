AddPayment = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      clients: Clients.find(),
      userID: StateVars.findOne({user: currentUser})._id,
    };
  },
  addPayment: function() {
    checkNum = document.getElementById("checkEdit").value; 
    amount = parseFloat(document.getElementById("payEdit").value);
    client = document.getElementById("clientEdit").value;
    date = document.getElementById("dateEdit").value;
    Meteor.call("addPayment", client, checkNum, amount, date);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "manageClients");
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
        
        <p><input id="clientEdit" list="parentList" onChange={this.handleParent} placeholder="Client">
            <datalist id="parentList">
              {this.data.clients.map(function(client) {
                return <option value={client.parents}/>
              })}
            </datalist>
          </input>
        </p>
        <p><input id="checkEdit" type="text" placeholder="Check #"/></p>
        <p>$<input id="payEdit" type="text" placeholder="Check Amount"/></p>
        <p>Date <input id="dateEdit" type="date" defaultValue={this.getToday()} /></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-primary" onClick={this.addPayment}>Submit</button></p>

      </div>);
  }
});