Global = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {user: Meteor.user()};
  },
  render: function() {
    if (!this.data.user) { // show login if no user
      return <Login />; 
    }
    else { // if user logged in
      if (Meteor.user().profile.master) { // enter master view
        view = <MasterView />;
      }
      else { // enter tutor view
        view = <TutorView />;
      }
      return (
        <div>
          <MonitorState />
          {view}
        </div>
      );
    }
  }
});