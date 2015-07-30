CreateUser = React.createClass({
  getInitialState: function() {
    return {failed: false,
            message: ""};
  },
  login: function() {
    var username = document.getElementById("login").value;
    var email = document.getElementById("email").value;
    var master = document.getElementById("master").checked;
    Accounts.createUser({username: username, email: email, password: "pass", profile:{master: checked}}, this.failedLogin);
  },
  failedLogin: function(error) {
    this.setState({failed: true, message: error});
  },
  render: function() {
    var failed = this.state.failed? <p>{this.state.message}</p>:<p></p>;
    return(
      <div>
        {failed}
        <p><input type="text" id="login" placeholder="Name" /></p>
        <p><input type="text" id="email" placeholder="Email" /></p>
        <p>Master Account <input type="checkbox" id="master" /></p>
        <p><button onClick={this.login}>Create</button></p>
        <p>The user will be created with default password "pass" which they may change on login</p>
      </div>);
  }
});