AddRate = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      clients: Clients.find(),
      users: Meteor.users.find(),
      userID: StateVars.findOne({user: currentUser})._id,
    };
  },
  addRate: function() {
    var tutor = document.getElementById("tutorEdit").value;
    var rate = parseInt(document.getElementById("rateEdit").value);
    var parent = document.getElementById("parentEdit").value;
    Meteor.call("addRate", tutor, parent, rate);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "manageRates");
  },

  render: function() {
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
        <p><input id="parentEdit" list="parentList" placeholder="Parent Name(s)">
            <datalist id="parentList">
              {this.data.clients.map(function(client) {
                return <option value={client.parents}/>
              })}
            </datalist>
          </input>
        </p>
        <p>$<input id="rateEdit" type="text" placeholder="Hourly or Monthly Rate"/></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-primary" onClick={this.addRate}>Submit</button></p>

      </div>);
  }
});