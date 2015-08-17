SinglePayExtraView = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {editMode: false};
  },
  getMeteorData: function() {
    return {
      thisExtra: PayExtras.findOne({_id: this.props.thisID}),
    };
  },
  enterEdit: function() {
    this.setState({editMode: true});
  },
  exitEdit: function() {
    this.setState({editMode: false});
  },
  editExtra: function() {
    var name = document.getElementById("name").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    Meteor.call("updateExtra", this.props.thisID, cycle, occasion, amount);
    this.exitEdit();
  },
  delete: function() {
    if (window.confirm("Are you sure you want to delete this extra?")) { 
      Meteor.call("deletePayExtra", this.props.thisID);
    }
  },
  render: function() {
    var extra = this.data.thisExtra;
    if (!extra) {
      return <div/>;
    }
    if (this.state.editMode) {
      return <li key={extra._id}>
              Tutor: {extra.tutor}, 
              Cycle: <input id="cycle" list="cycleList" defaultValue={extra.cycle.name}>
                  <datalist id="cycleList">
                    {this.data.cycles.map(function(cycle) {
                      return <option value={cycle.name}/>
                    })}
                  </datalist>
                </input>, 
              Occasion: <input id="occasion" type="text" placeholder="Occasion"/>, 
              Amount: $<input id="amount" type="text" placeholder="Amount"/> 
              <button onClick={this.editExtra}>Submit</button> 
              <button onClick={this.delete}>Delete</button>
              <button onClick={this.exitEdit}>Cancel</button> 
            </li>;
    } else {
      return <li key={extra._id}>Tutor: {extra.tutor}, 
                                Cycle: {extra.cycle}, 
                                Occasion: {extra.occastion}, 
                                Amount: {extra.amount} 
                                <button onClick={this.enterEdit}>Edit</button> 
            </li>;
    }
  }
});