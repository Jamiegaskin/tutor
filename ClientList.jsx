ClientList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      clients: Clients.find(),
    };
  },
  addClient: function() {
  	Meteor.call("setMode", "addClient");
  },
  render: function() {
	  return (
	    <div>
	    	
	    	<button onClick={this.addClient}>Add Another Client</button>
		      {this.data.clients.map(function(client){
		        return <SingleClientView thisID = {client._id} />;
		      })}
	    </div>
	    );
	}
  });