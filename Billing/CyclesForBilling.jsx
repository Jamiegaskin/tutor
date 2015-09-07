CyclesForBilling = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      cycles: Cycles.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<ul>
		      {this.data.cycles.map(function(cycle){
		        return <SingleCycleForBilling key={cycle._id} thisID = {cycle._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });