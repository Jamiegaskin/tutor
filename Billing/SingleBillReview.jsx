SingleBillReview = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var session = StateVars.findOne({user: Meteor.user().username});
    return {
      thisBill: Bills.findOne({_id: session.editID}),
    };
  },
  approve: function() {
    Meteor.call("approveAndSendBill", "id");
    this.exit();
  },
  exit: function() {
    var cycleID = this.data.thisBill.cycle._id
    Meteor.call("setModeAndEditID", "cycleBillList", cycleID);
  },
  render: function() {
    var bill = this.data.thisBill;
    return <div>
            <iframe height="825" width="638" src={"/bills/"+bill.cycle.name+"/"+bill.client.parents+" "+bill.cycle.name+".pdf?"+Date.now()}></iframe>
            <p>
              <button className="btn btn-default btn-raised" onClick={this.exit}>Cancel</button>
              <button className="btn btn-default btn-raised" onClick={this.approve}>{bill.sent? "Resend":"Approve and Send"}</button>
            </p>
          </div>;
  }
});