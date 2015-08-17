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
    tutor = document.getElementById("tutorEdit").value;
    rate = parseInt(document.getElementById("rateEdit").value);
    parent = document.getElementById("parentEdit").value;
    Meteor.call("addRate", tutor, parent, rate);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "manageRates");
  },

  render: function() {
    return (
      <div>
        <h1>Add Rate</h1>
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
        <p>$<input id="rateEdit" type="text" placeholder="Hourly Rate"/></p>
        <p><button onClick={this.exit}>cancel</button>
          <button onClick={this.addRate}>submit</button></p>

      </div>);
  }
});