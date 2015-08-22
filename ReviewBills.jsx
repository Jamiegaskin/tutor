ReviewBills = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      cycles: Cycles.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Review and send bills</h1>
	    	<ul>
		      {this.data.cycles.map(function(cycle){
		        return <SingleBillView key={cycle._id} thisID = {cycle._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });