Login = React.createClass({
  getInitialState: function() {
    return {failed: false};
  },
  login: function() {
    var username = document.getElementById("username").value||"Jamie Gaskin";
    var password = document.getElementById("password").value||"Musicislife7";
    Meteor.loginWithPassword(username, password, this.failedLogin);
  },
  failedLogin: function(error) {
    if (error) {
      console.log(error);
      this.setState({failed: true});
    }
  },
  keyPress: function(event) {
    if (event.key === "Enter") {
      this.login();
    }
  },
  render: function() {
    var failed = this.state.failed? <p>Invalid Login</p>:<p></p>;
    return(
      <div onKeyPress={this.keyPress}>
        {failed}
        <p><input type="text" id="username" placeholder="Name" /></p>
        <p><input type="password" id="password" placeholder="Password" /></p>
        <p><button onClick={this.login}>Login</button></p>
      </div>);
  }
});