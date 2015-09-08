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
    return <tr key={rate._id}><td>{rate.tutor}</td>
                              <td>{rate.parents}</td>
                              <td>${rate.rate}</td>
                              <td><button className="btn btn-raised btn-default" onClick={this.enterEditMode}>Edit</button></td>
          </tr>;
  }
});