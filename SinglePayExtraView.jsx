SinglePayExtraView = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {editMode: false};
  },
  getMeteorData: function() {
    return {
      thisExtra: PayExtras.findOne({_id: this.props.thisID}),
      users: Meteor.users.find(),
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
    var tutorName = document.getElementById("tutorEdit").value;
    var tutorID = Meteor.users.findOne({username: tutorName})._id;
    var cycleName = document.getElementById("cycle").value;
    var cycleID = Cycles.findOne({name: cycleName})._id;
    var occasion = document.getElementById("occasion").value;
    var amount = parseFloat(document.getElementById("amount").value);
    Meteor.call("editPayExtra", this.props.thisID, tutorID, cycleID, occasion, amount);
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
    var tutor = Meteor.users.findOne({_id: extra.tutorID}).username;
    var cycle = Cycles.findOne({_id: extra.cycleID}).name;
    if (this.state.editMode) {
      return <li key={extra._id}>
              Tutor <select id="tutorEdit" defaultValue={tutor}>
                  {this.data.users.map(function(tutor) {
                    if(tutor.profile.status === "Admin") {
                      return;
                    }
                    return <option>{tutor.username}</option>;
                  })}
                </select>, 
              Cycle: <input id="cycle" list="cycleList" defaultValue={cycle} />
                  <datalist id="cycleList">
                    {this.data.cycles.map(function(cycle) {
                      return <option value={cycle.name}/>
                    })}
                  </datalist>, 
              Occasion: <input id="occasion" type="text" defaultValue={extra.occasion}/>, 
              Amount: $<input id="amount" type="text" defaultValue={extra.amount}/> 
              <button className="btn btn-raised btn-primary" onClick={this.editExtra}>Submit</button> 
              <button className="btn btn-raised btn-default" onClick={this.delete}>Delete</button>
              <button className="btn btn-raised btn-default" onClick={this.exitEdit}>Cancel</button> 
            </li>;
    } else {
      return <li key={extra._id}>Tutor: {tutor}, 
                                Cycle: {cycle}, 
                                Occasion: {extra.occasion}, 
                                Amount: ${extra.amount} 
                                <button className="btn btn-raised btn-default" onClick={this.enterEdit}>Edit</button> 
            </li>;
    }
  }
});