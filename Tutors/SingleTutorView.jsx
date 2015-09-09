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
    return <tr key={tutor._id}><td>{tutor.username}</td>
                              <td>{tutor.emails}</td>
                              <td>{tutor.profile.status}</td>
                              <td>${tutor.profile.pay.base}</td>
                              <td>${tutor.profile.pay.ap}</td>
                              <td>${tutor.profile.pay.phd}</td>
                              <td>${tutor.profile.pay.travel}</td>
                              <td>{tutor.profile.master? "Yes":"No"}</td>
                              <td><button className="btn btn-default btn-raised" onClick={this.enterEditMode}>Edit</button></td>
          </tr>;
  }
});