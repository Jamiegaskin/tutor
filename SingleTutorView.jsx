SingleTutorView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    Meteor.subscribe("allUsers");
    return {
      thisTutor: Meteor.users.findOne({_id: this.props.thisID}),
    };
  },
  enterEditMode: function() {
    var currentUserID = StateVars.findOne({user: Meteor.user().username})._id;
    StateVars.update(currentUserID, {$set:{mode: "editTutor", editID: this.props.thisID}});
  },
  render: function() {
    var tutor = this.data.thisTutor;
    return <li key={tutor._id}>Tutor: {tutor.username},
                              Email: {tutor.emails},
                              Status: {tutor.profile.status},
                              Pay per hour: ${tutor.profile.pay.base},
                              AP extra: ${tutor.profile.pay.ap},
                              PhD extra: ${tutor.profile.pay.phd},
                              Travel extra: ${tutor.profile.pay.travel},
                              Master: {tutor.profile.master? "Yes":"No"},
                              <button onClick={this.enterEditMode}>Edit</button>
          </li>;
  }
});