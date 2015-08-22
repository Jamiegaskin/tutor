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
        view = <ViewMaster />;
      }
      else { // enter tutor view
        view = <ViewTutor />;
      }
      return (
        <div>
          <Body view={view} />
        </div>
      );
    }
  }
});
