SinglePayReview = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var session = StateVars.findOne({user: Meteor.user().username});
    return {
      thisPay: PayStubs.findOne({_id: session.editID}),
    };
  },
  approve: function() {
    Meteor.call("approveAndSendPay", "id");
    this.exit();
  },
  exit: function() {
    var cycleID = this.data.thisPay.cycle._id
    Meteor.call("setModeAndEditID", "cyclePayList", cycleID);
  },
  render: function() {
    var pay = this.data.thisPay;
    return <div>
            <iframe height="825" width="638" src={"/pay_stubs/"+pay.cycle.name+"/"+pay.tutor.username+" "+pay.cycle.name+".pdf?"+Date.now()}></iframe>
            <p>
              <button className="btn btn-default btn-raised" onClick={this.exit}>Cancel</button>
              <button className="btn btn-default btn-raised" onClick={this.approve}>{pay.sent? "Resend":"Approve and Send"}</button>
            </p>
          </div>;
  }
});