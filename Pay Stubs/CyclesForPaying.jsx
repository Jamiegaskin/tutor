CyclesForPaying = React.createClass({
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
		        return <SingleCycleForPaying key={cycle._id} thisID = {cycle._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });