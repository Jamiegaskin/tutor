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
	    	<button className="btn btn-raised btn-default" onClick={this.addClient}>Add Another Client</button>
        <table data-toggle="table" className="table">
            <thead>
                <tr>
                    <th>Parents</th>
                    <th>Students</th>
                    <th>Emails</th>
                    <th>Address</th>
                    <th>Home Phone</th>
                    <th>Mother's Cell</th>
                    <th>Father's Cell</th>
                    <th>Student's Cells</th>
                    <th>Previous Balance</th>
                    <th>Paid this cycle</th>
                    <th>Current Balance</th>
                    <th>Active</th>
                    <th>Edit</th>
                    <th>Pay History</th>
                </tr>
            </thead>
  		      {this.data.clients.map(function(client){
  		        return <SingleClientView thisID = {client._id} />;
  		      })}
        </table>
	    </div>
	    );
	}
  });