AddTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      userID: StateVars.findOne({user: currentUser})._id,
    };
  },
  getInitialState: function() {
    return {failed: false,
            message: ""};
  },
  addTutor: function() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var status = document.getElementById("status").value;
    var master = document.getElementById("master").checked;
    var pay = parseInt(document.getElementById("pay").value);
    var ap = parseInt(document.getElementById("ap").value);
    var phd = parseInt(document.getElementById("phd").value);
    var travel = parseInt(document.getElementById("travel").value);
    if (!username){
      this.setState({failed: true, errorMessage: "Please enter at least a name."});
      return;
    }
    Meteor.call("addTutor", username, email, status, master, pay, ap, phd, travel);
    this.exit();
  },
  exit: function() {
    Meteor.call("setMode", "apptView");
  },
  render: function() {
    var failed = this.state.failed? <p>{this.state.message}</p>:<p></p>;
    return(
      <div>
        {failed}
        <p><input type="text" id="username" placeholder="Name" /></p>
        <p><input type="text" id="email" placeholder="Email" /></p>
        <p>Status: <select id="status">
              <option>Associate</option>
              <option>Senior</option>
              <option>Founder</option>
              <option>Admin</option>
            </select>
        </p>
        <p>$<input type="text" id="pay" placeholder="Pay per hour" /></p>
        <p>$<input type="text" id="ap" placeholder="Extra for AP" /></p>
        <p>$<input type="text" id="phd" placeholder="Extra for PhD" /></p>
        <p>$<input type="text" id="travel" placeholder="Extra for Travel" /></p>
        <p>Master Account <input type="checkbox" id="master" /></p>
        <p><button className="btn btn-default" onClick={this.exit}>Cancel</button>
          <button className="btn btn-default" onClick={this.addTutor}>Add</button></p>
        <p>The user will be created with their name as their username and default password "pass" which they may change on login.</p>
      </div>);
  }
});