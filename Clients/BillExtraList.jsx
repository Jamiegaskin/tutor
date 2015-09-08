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
	    	<button className="btn btn-raised btn-default" onClick={this.addAnotherBill}>Add Another Bill Extra</button>
	    	<ul>
	    		{this.data.billExtras.map(function(extra) {
	    			return <SingleBillExtraView thisID={extra._id} />;
	    		})}
	    	</ul>
	    </div>
	    );
	}
  });