SingleCycleView = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {editMode: false};
  },
  getMeteorData: function() {
    return {
      thisCycle: Cycles.findOne({_id: this.props.thisID}),
    };
  },
  enterEdit: function() {
    this.setState({editMode: true});
  },
  exitEdit: function() {
    this.setState({editMode: false});
  },
  editCycle: function() {
    var name = document.getElementById("name").value;
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    Meteor.call("updateCycle", this.props.thisID, name, start, end);
    this.exitEdit();
  },
  deleteCycle: function() {
    if (window.confirm("Are you sure you want to delete this cycle?")) { 
      Meteor.call("deleteCycle", this.props.thisID);
    }
  },
  render: function() {
    var cycle = this.data.thisCycle;
    if (!cycle) {
      return <div/>;
    }
    if (this.state.editMode) {
      return <li key={cycle._id}>Name: <input type="text" id="name" defaultValue={cycle.name} />, 
                                Start: <input type="date" id="start" defaultValue={cycle.start} />, 
                                End: <input type="date" id="end" defaultValue={cycle.end} /> 
                                <button className="btn btn-default" onClick={this.editCycle}>Submit</button> 
                                <button className="btn btn-default" onClick={this.deleteCycle}>Delete</button>
                                <button className="btn btn-default" onClick={this.exitEdit}>Cancel</button> 
            </li>;
    } else {
      return <li key={cycle._id}>Name: {cycle.name}, 
                                Start: {cycle.start}, 
                                End: {cycle.end}  
                                <button className="btn btn-default" onClick={this.enterEdit}>Edit</button> 
            </li>;
    }
  }
});