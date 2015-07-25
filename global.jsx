Global = ReactMeteor.createClass({
	startMeteorSubscriptions: function() {
    Meteor.subscribe("appts")
  },
  getMeteorState: function() {
    return {
      appts: Appts.find().fetch(),
      editMode: false,
      IDforEdit: ""
    };
  },
  enterEditMode: function(thisID) {
    this.setState({IDforEdit: thisID});
    this.setState({editMode: true});
  },
  exitEditMode: function() {
    this.setState({editMode: false});
  },
  render: function() {
    if (this.state.editMode) {
      return <SingleApptEdit thisID = {this.state.IDforEdit} exitEditMode = {this.exitEditMode.bind(this)} enterEditMode = {this.enterEditMode.bind(this, thisID)} />;
    }
    return (
      <div>
        {this.state.appts.map(function(appt){
          return <SingleApptTutor thisID = {appt._id} />;
        })}
      </div>
      )
  }
});