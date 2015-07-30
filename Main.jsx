Appts = new Mongo.Collection("appts");
Rates = new Mongo.Collection("rates");
Adjustments = new Mongo.Collection("adjustments");
StateVars = new Mongo.Collection("stateVars");
Pays = new Mongo.Collection("pays");

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<Global />, document.getElementById("content"));
    //React.render(<Test />, document.body);
  });
};
/*
if (Meteor.isServer) {
  Meteor.publish("users", function() {
    return Users.find();
  })
}*/
/*
var Test = React.createClass({
  mixins: [ReactMeteorData],
  startMeteorSubscriptions: function() {
    Meteor.subscribe("appts");
  },
  getMeteorData: function() {
    return {
      thisAppt: Appts.findOne({tutor: "Jamie Gaskin"})
    };
  },
  submit: function() {
  	Appts.update(this.data.thisAppt._id, {$set: {travel: document.getElementById("travelEdit").checked}});
  },
  render: function() {
  	var value = this.data.thisAppt.travel;
    return (
    	<div>
    		<input id = "travelEdit" type = "checkbox" defaultChecked={value} />
    		<button onClick = {this.submit}>submit</button>
    	</div>);
  }
});
*/