SingleCycleForBilling = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      thisCycle: Cycles.findOne({_id: this.props.thisID}),
    };
  },
  enterBillList: function() {
    Meteor.call("setModeAndEditID", "cycleBillList", this.props.thisID);
    Meteor.call("generateCycleBills", this.data.thisCycle);
  },
  render: function() {
    var cycle = this.data.thisCycle;
    return <li>
            {cycle.name} 
            <button className="btn btn-raised btn-default" onClick={this.enterBillList}>Select</button> 
          </li>;
  }
});