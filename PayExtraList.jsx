PayExtraList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      payExtras: PayExtras.find(),
    };
  },
  addAnother: function() {
  	Meteor.call("setMode", "addPayExtra");
  },
  render: function() {
	  return (
	    <div>
	    	
	    	<ul>
	    		{this.data.payExtras.map(function(extra) {
	    			return <SinglePayExtraView thisID={extra._id} />;
	    		})}
	    	</ul>
	    	<button className="btn btn-raised btn-default" onClick={this.addAnother}>Add Another Pay Extra</button>
	    </div>
	    );
	}
  });