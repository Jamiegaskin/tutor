RatesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      rates: Rates.find(),
    };
  },
  addRate: function() {
  	Meteor.call("setMode", "addRate");
  },
  render: function() {
	  return (
	    <div>
	    	
	    	<button className="btn btn-raised btn-default" onClick={this.addRate}>Add Another Rate</button>
	    	<table data-toggle="table" className="table">
	    	    <thead>
	                <tr>
	                    <th>Tutor</th>
	                    <th>Client</th>
	                    <th>Rate</th>
	                    <th>Edit</th>
	                </tr>
	            </thead>
		      {this.data.rates.map(function(rate){
		        return <SingleRateView thisID = {rate._id} />;
		      })}
		    </table>
	    </div>
	    );
	}
  });