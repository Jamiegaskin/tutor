BillExtraList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      billExtras: BillExtras.find(),
    };
  },
  addAnotherBill: function() {
  	Meteor.call("setMode", "addBillExtra");
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Client Bill Extras</h1>
	    	<ul>
	    		{this.data.billExtras.map(function(extra) {
	    			return <SingleBillExtraView thisID={extra._id} />;
	    		})}
	    	</ul>
	    	<button className="btn btn-default" onClick={this.addAnotherBill}>Add Another Bill Extra</button>
	    </div>
	    );
	}
  });