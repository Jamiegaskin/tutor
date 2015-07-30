EditEmail = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {fail: false};
  },
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      userID: StateVars.findOne({user: currentUser})._id,
      email: Meteor.user().emails[0]
    };
  },
  exitEditEmail: function() {
    StateVars.update(this.data.userID, {$set: {mode: "apptView"}});
  },
  updateEmail: function() {
    var newEmail = document.getElementById("emailEdit").value;
    var newEmailConfirm = document.getElementById("emailEditConfirm").value;
    if(newEmail != newEmailConfirm) {
      this.setState({fail: true});
      return
    }
    Meteor.users.update(Meteor.userId(), {$set: {email: newEmail}});
    this.exitEditEmail();
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
        <p><button onClick={this.exitEditEmail}>cancel</button>
          <button onClick={this.updateEmail}>update</button></p>
      </div>
      );
  }
});