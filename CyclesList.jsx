CyclesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      cycles: Cycles.find(),
    };
  },
  addCycle: function() {
  	Meteor.call("setMode", "addCycle");
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Manage Billing Cycles</h1>
	    	<button onClick={this.addCycle}>Add Another Cycle</button>
	    	<ul>
		      {this.data.cycles.map(function(cycle){
		        return <SingleCycleView thisID = {cycle._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });