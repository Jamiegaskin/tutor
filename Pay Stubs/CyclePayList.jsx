CyclePayList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
  	var user = Meteor.user().username;
  	var session = StateVars.findOne({user: user});
    return {
      payStubs: PayStubs.find({"cycle._id": session.editID}),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<ul>
		      {this.data.payStubs.map(function(payStub){
		        return <SinglePayView key={payStub._id} thisID = {payStub._id} />;
		      })}
		    </ul>
	    </div>
	    );
	}
  });