TutorView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = "Jamie Gaskin"; // change later to get logged in user
    return {
      appts: Appts.find().fetch(),
      session: StateVars.findOne({user: currentUser}),
    };
  },
  render: function() {
    var mode = this.data.session.mode;
    var body;
    if (mode === "edit") {
      body = <SingleApptEdit thisID = {this.data.session.editID} />;
    }
    else if (mode === "editPass") {
      body = <EditPass />;
    }
    else if (mode === "editEmail") {
      body = <EditEmail />;
    }
    else if (mode === "apptView") {
      body = (
        <div>
          {this.data.appts.map(function(appt){
            return <SingleApptTutor thisID = {appt._id} />;
          })}
        </div>
        );
    }
    return (
      <div>
        {body}
        <button onClick={Meteor.logout}>logout</button>
      </div>
      )
  }
});