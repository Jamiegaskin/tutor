CycleBillList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
  	var user = Meteor.user().username;
  	var session = StateVars.findOne({user: user});
    return {
      bills: Bills.find({"cycle._id": session.editID}),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<ul>
		      {this.data.bills.map(function(bill){
		        return <SingleBillView key={bill._id} thisID = {bill._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });