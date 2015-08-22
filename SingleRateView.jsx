SingleRateView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisRate: Rates.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    var currentUserID = StateVars.findOne({user: Meteor.user().username})._id;
    StateVars.update(currentUserID, {$set:{mode: "editRate", editID: this.props.thisID}});
  },
  render: function() {
    var rate = this.data.thisRate;
    return <li key={rate._id}>Tutor: {rate.tutor},
                              Client: {rate.parents},
                              Rate: ${rate.rate} 
                              <button className="btn btn-default" onClick={this.enterEditMode}>Edit</button>
          </li>;
  }
});