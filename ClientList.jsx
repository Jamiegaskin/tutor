ClientList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      clients: Clients.find(),
    };
  },
  render: function() {
	  return (
	    <div>
	    	<h1>Manage Clients</h1>
		      {this.data.clients.map(function(client){
		        return <SingleClientView thisID = {client._id} />;
		      })}
	    </div>
	    );
	}
  });