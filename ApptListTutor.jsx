ApptListTutor = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    return {
      appts: Appts.find({tutor: Meteor.user().username}, {sort:{date: -1}}),
    };
  },
  addAppt: function() {
    Meteor.call("setMode", "addAppt");
  },
  render: function() {
    return (
      <div>
        
        <button onClick={this.addAppt}>Add Another Appointment</button>
        <p>Pay, as of now, does not accurately reflect type A cancellations, but is calculated correctly in bills and pay stubs</p>
        <ul>
          {this.data.appts.map(function(appt){
            return <SingleApptTutor key={appt._id} thisID = {appt._id} />;
          })}
        </ul>
      </div>
      );
  }
  });