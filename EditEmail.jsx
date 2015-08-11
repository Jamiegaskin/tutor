EditPass = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      fail: false,
      error: "",
      };
  },
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      userID: StateVars.findOne({user: currentUser})._id,
    };
  },
  exit: function() {
    Meteor.call("setMode", "apptView");
  },
  updatePass: function() {
    var newEmail = document.getElementById("emailEdit").value;
    var newEmailConfirm = document.getElementById("emailEditConfirm").value;
    if (!newEmail) {
      return;
    }
    if(newEmail != newEmailConfirm) {
      this.setState({fail: true});
      return;
    }
    Meteor.call("updateEmail", newEmail);
    this.exit();
  },
  emailCallback: function(error) {
    if (error) {
      this.setState({fail: true, error: error});
    }
  },
  render: function() {
    var failAlert = this.state.fail? <p>Emails must match</p>:<p/>
    return (
      <div>
        <h1>update email</h1>
        <p>current email: {this.data.email}</p>
        {failAlert}
        <p><input id="emailEdit" type="text" placeholder="New email" /></p>
        <p><input id="emailEditConfirm" type="text" placeholder="Confirm new email" /></p>
        <p><button onClick={this.exit}>cancel</button>
          <button onClick={this.updatePass}>update</button></p>
      </div>
      );
  }
});