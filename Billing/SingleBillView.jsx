SingleBillView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisBill: Bills.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    Meteor.call("setModeAndEditID", "reviewBill", this.props.thisID);
  },
  render: function() {
    var bill = this.data.thisBill;
    return <li key={bill._id}>{bill.sent? "approved and sent":"awaiting approval"}, {" "}
                              {bill.client.parents}, {" "}
                              {bill.cycle.name} {" "}
                              <button className="btn btn-default btn-raised" onClick={this.enterEditMode}>Preview</button>
          </li>;
  }
});