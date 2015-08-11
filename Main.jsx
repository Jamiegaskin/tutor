Appts = new Mongo.Collection("appts");
Rates = new Mongo.Collection("rates");
Adjustments = new Mongo.Collection("adjustments");
StateVars = new Mongo.Collection("stateVars");
Clients = new Mongo.Collection("clients");

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<Global />, document.getElementById("content"));
    /* logs out at window close
    window.onbeforeunload = OnBeforeUnLoad;
    function OnBeforeUnLoad () {
            Meteor.logout();
        }
        */
    //React.render(<Test />, document.getElementById("test"));
  });
};

if (Meteor.isServer) {
  Accounts.onLogin(function(user) {
    StateVars.update({user: user.user.username}, {$set:{mode: "addAppt", editID: ""}});
  });
  Meteor.publish("allUsers", function() {
    return Meteor.users.find();
  })
}

var Test = React.createClass({
  render: function() {
    var arrayTest = [1, 2, 3, 4, 5];
    return (
    	<div>
        <ul id="list">
          {arrayTest.map(function(num) {
            return <li>{num}</li>;
          })}
        </ul>
    	</div>);
  }
});
