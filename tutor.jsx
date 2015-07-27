Appts = new Mongo.Collection("appts");
Rates = new Mongo.Collection("rates");
Adjustments = new Mongo.Collection("adjustments");
StateVars = new Mongo.Collection("stateVars");
Pays = new Mongo.Collection("pays");

if (Meteor.isClient) {
  Meteor.startup(function () {
  	React.render(<MonitorState />, document.getElementById("monitor"));
    React.render(<Global />, document.getElementById("content"));
  });
}
