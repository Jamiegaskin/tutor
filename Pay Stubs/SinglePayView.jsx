SinglePayView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisPay: PayStubs.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    Meteor.call("setModeAndEditID", "reviewPay", this.props.thisID);
  },
  render: function() {
    var pay = this.data.thisPay;
    return <li key={pay._id}>{pay.sent? "approved and sent":"awaiting approval"},
                              {pay.tutor.username},
                              {pay.cycle.name},
                              <button className="btn btn-default btn-raised" onClick={this.enterEditMode}>Preview</button>
          </li>;
  }
});