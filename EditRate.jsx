EditRate = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    var session = StateVars.findOne({user: currentUser})
    return {
      thisRate: Rates.findOne({_id: session.editID}),
      clients: Clients.find(),
      users: Meteor.users.find(),
      userID: session._id,
    };
  },
  editRate: function() {
    tutor = document.getElementById("tutorEdit").value;
    rate = parseInt(document.getElementById("rateEdit").value);
    parent = document.getElementById("parentEdit").value;
    Meteor.call("editRate", this.data.thisRate._id, tutor, parent, rate);
    this.exit();
  },
  deleteRate: function() {
    if (window.confirm("Are you sure you want to delete this rate?")) { 
      Meteor.call("deleteRate", this.data.thisRate._id);
      this.exit();
    }
  },
  exit: function() {
    StateVars.update(this.data.userID, {$set: {mode: "manageRates"}});
  },
  render: function() {
    rate = this.data.thisRate;
    return (
      <div>
        
        <p>Tutor: <select id="tutorEdit" defaultValue={rate.tutor}>
            {this.data.users.map(function(tutor) {
              if(tutor.profile.status === "Admin") {
                return;
              }
              return <option>{tutor.username}</option>;
            })}
          </select>
        </p>
        <p>Client: <input id="parentEdit" list="parentList" defaultValue={rate.parents}>
            <datalist id="parentList">
              {this.data.clients.map(function(client) {
                return <option value={client.parents}/>
              })}
            </datalist>
          </input>
        </p>
        <p>Rate: $<input id="rateEdit" type="text" defaultValue={rate.rate} /></p>
        <p><button className="btn btn-default" onClick={this.exit}>Cancel</button>
           <button className="btn btn-default" onClick={this.deleteRate}>Delete</button>
           <button className="btn btn-default" onClick={this.editRate}>Submit</button></p>

      </div>);
  }
});