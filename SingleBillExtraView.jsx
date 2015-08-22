SingleBillExtraView = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {editMode: false};
  },
  getMeteorData: function() {
    return {
      thisExtra: BillExtras.findOne({_id: this.props.thisID}),
      clients: Clients.find(),
      cycles: Cycles.find()
    };
  },
  enterEdit: function() {
    this.setState({editMode: true});
  },
  exitEdit: function() {
    this.setState({editMode: false});
  },
  editExtra: function() {
    var clientName = document.getElementById("client").value;
    var clientID = Clients.findOne({parents: clientName})._id;
    var cycleName = document.getElementById("cycle").value;
    var cycleID = Cycles.findOne({name: cycleName})._id;
    var occasion = document.getElementById("occasion").value;
    var amount = parseFloat(document.getElementById("amount").value);
    Meteor.call("editBillExtra", this.props.thisID, clientID, cycleID, occasion, amount);
    this.exitEdit();
  },
  delete: function() {
    if (window.confirm("Are you sure you want to delete this extra?")) { 
      Meteor.call("deleteBillExtra", this.props.thisID);
    }
  },
  render: function() {
    var extra = this.data.thisExtra;
    if (!extra) {
      return <div/>;
    }
    var client = Clients.findOne({_id: extra.clientID}).parents;
    var cycle = Cycles.findOne({_id: extra.cycleID}).name;
    if (this.state.editMode) {
      return <li key={extra._id}>
              Client: <input id="client" list="clientList" defaultValue={client} />
                  <datalist id="clientList">
                    {this.data.clients.map(function(client) {
                      return <option value={client.parents}/>;
                    })}
                  </datalist> ,  
              Cycle: <input id="cycle" list="cycleList" defaultValue={cycle} />
                  <datalist id="cycleList">
                    {this.data.cycles.map(function(cycle) {
                      return <option value={cycle.name}/>
                    })}
                  </datalist>, 
              Occasion: <input id="occasion" type="text" defaultValue={extra.occasion}/>, 
              Amount: $<input id="amount" type="text" defaultValue={extra.amount}/> 
              <button className="btn btn-default" onClick={this.editExtra}>Submit</button> 
              <button className="btn btn-default" onClick={this.delete}>Delete</button>
              <button className="btn btn-default" onClick={this.exitEdit}>Cancel</button> 
            </li>;
    } else {
      return <li key={extra._id}>Client: {client}, 
                                Cycle: {cycle}, 
                                Occasion: {extra.occasion}, 
                                Amount: ${extra.amount} 
                                <button className="btn btn-default" onClick={this.enterEdit}>Edit</button> 
            </li>;
    }
  }
});