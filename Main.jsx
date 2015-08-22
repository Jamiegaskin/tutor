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
  Accounts.onLogin(function(user) {
    //StateVars.update({user: user.user.username}, {$set:{mode: "addAppt", editID: ""}});
  });
  Meteor.publish("allUsers", function() {
    return Meteor.users.find();
  })
}

var Test = React.createClass({
  emailTest: function() {
    Meteor.call("sendEmail", "jamiegaskin@gmail.com", "jamiegaskin@gmail.com", "testing", "does this work? <a href="+BillDataURL+">bill</a>")
  },
  render: function() {
    /*
    var doc = new jsPDF("p","pt","letter");
    doc.addImage(BillDataURL, 'JPEG', 0, 0, 612, 792);
    doc.save("name");
    var divStyle = {
      height: "1650px",
      width: "1275px",
    };
    */
    return (<div>
              <iframe height="1650" width="1275" src={BillDataURL}></iframe>
              <button className="btn btn-raised btn-default" onClick={this.emailTest}>EMAIL!</button>
            </div>)
  }
});
