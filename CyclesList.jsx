CyclesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      cycles: Cycles.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Manage Billing Cycles</h1>
	    	<ul>
		      {this.data.cycles.map(function(cycle){
		        return <SingleCycleView thisID = {cycle._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });