SingleRateView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisRate: Rates.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    Meteor.call("setModeAndEditID", "editRate", this.props.thisID);
  },
  render: function() {
    var rate = this.data.thisRate;
    return <li key={rate._id}>Tutor: {rate.tutor},
                              Client: {rate.parents},
                              Rate: ${rate.rate} 
                              <button className="btn btn-raised btn-default" onClick={this.enterEditMode}>Edit</button>
          </li>;
  }
});