RatesList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      rates: Rates.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Rates</h1>
	    	<ul>
		      {this.data.rates.map(function(rate){
		        return <SingleRateView thisID = {rate._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });