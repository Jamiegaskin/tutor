Appts = new Mongo.Collection("appts");
Rates = new Mongo.Collection("rates");
Adjustments = new Mongo.Collection("adjustments");
StateVars = new Mongo.Collection("stateVars");
Clients = new Mongo.Collection("clients");
Cycles = new Mongo.Collection("cycles");
PayExtras = new Mongo.Collection("payExtras");
BillExtras = new Mongo.Collection("billExtras");
Bills = new Mongo.Collection("bills");
PayStubs = new Mongo.Collection("payStubs");

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
  Meteor.publish("allUsers", function() {
    return Meteor.users.find();
  })
}

var Test = React.createClass({
  render: function() {
    return (<div>
              <iframe height="825" width="638" src="/output/Jamie_August2015.pdf"></iframe>
            </div>)
  }
});
