ViewTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      session: StateVars.findOne({user: currentUser}),
    };
  },
  render: function() {
    var mode = this.data.session.mode;
    var body;
    if (mode === "editAppt") {
      body = <EditSingleAppt />;
    }
    else if (mode === "editPass") {
      body = <EditPass />;
    }
    else if (mode === "apptView") {
      body = <ApptListTutor />;
    }
    else if (mode === "addAppt") {
      body = <AddApptTutor />;
    }
    return (
      <div>
        <RouterTutor />
        {body}
      </div>
      )
  }
});