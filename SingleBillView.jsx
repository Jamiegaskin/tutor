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
    var rate = this.data.thisRate;
    return <li key={rate._id}>Tutor: {rate.tutor},
                              Client: {rate.parents},
                              Rate: ${rate.rate} 
                              <button className="btn btn-default btn-raised" onClick={this.enterEditMode}>Edit</button>
          </li>;
  }
});