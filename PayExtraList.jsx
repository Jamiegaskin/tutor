PayExtraList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      cycles: Cycles.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Manage Tutor Pay Extras</h1>
	    	{this.data.cycles.map(function(cycle) {
	    		var payStubs = PayStubs.find({"cycle._id": cycle._id});
	    		if (!payStubs) {
	    			return <div/>
	    		} else {
		    		return (<div>
		    					<h2>{cycle.name}</h2>
		    					<ul>
							      {payStubs.map(function(payStub){
							        return (					        	
								        	{payStub.extras.map(function(extra, index) {
								        		return <SinglePayExtraView thisID = {payStub._id} index={index} extra={extra} />;
								        	})}
								        )
							      })}
							    </ul>  
						    </div>)
		    	}
	    	})}
	    </div>
	    );
	}
  });