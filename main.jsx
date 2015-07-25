Appts = new Mongo.Collection("appts");
Rates = new Mongo.Collection("rates");
Pays = new Mongo.Collection("pays");

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<Global />, document.body);
  });
}
