ApptListTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      appts: Appts.find({tutor: Meteor.user().username}, {sort:{date: -1}}),
    };
  },
  render: function() {
    return (
      <div>
        <h1>Appointments</h1>
        <ul>
          {this.data.appts.map(function(appt){
            return <SingleApptTutor thisID = {appt._id} />;
          })}
        </ul>
      </div>
      );
  }
  });