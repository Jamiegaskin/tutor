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
    var oldPass = document.getElementById("oldPass").value;
    var newPass = document.getElementById("passEdit1").value;
    var newPassConfirm = document.getElementById("passEdit2").value;
    if (!newPass) {
      return;
    }
    if(newPass != newPassConfirm) {
      this.setState({fail: true, error: "Passwords must match."});
      return;
    }
    Accounts.changePassword(oldPass, newPass, this.passCallback);
    this.exit();
  },
  passCallback: function(error) {
    if (error) {
      this.setState({fail: true, error: error});
    }
    else {
      this.setState({fail:false});
    }
  },
  render: function() {
    var failAlert = this.state.fail? <p>this.state.error</p>:"";
    return (
      <div>
        
        {failAlert}
        <p><input id="oldPass" type="password" placeholder="Old password" /></p>
        <p><input id="passEdit1" type="password" placeholder="New password" /></p>
        <p><input id="passEdit2" type="password" placeholder="Confirm new password" /></p>
        <p><button className="btn btn-raised btn-default" onClick={this.exit}>cancel</button>
          <button className="btn btn-raised btn-default" onClick={this.updatePass}>update</button></p>
      </div>
      );
  }
});