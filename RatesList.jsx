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
	    	<h1>Rates</h1>
	    	<button onClick={this.addRate}>Add Another Rate</button>
	    	<ul>
		      {this.data.rates.map(function(rate){
		        return <SingleRateView thisID = {rate._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });