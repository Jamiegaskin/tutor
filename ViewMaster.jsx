ViewMaster = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {
      appts: Appts.find().fetch(),
      session: StateVars.findOne({user: currentUser}),
    };
  },
  render: function() {
    if (!this.data.session) {
      return <div>Loading...</div>;
    }
    var mode = this.data.session.mode;
    var body;
    if (mode === "editAppt") {
      body = <EditSingleApptMaster />;
    }
    else if (mode === "editPass") {
      body = <EditPass />;
    }
    else if (mode === "editTutor") {
      body = <EditTutor />;
    }
    else if (mode === "editClient") {
      body = <EditClient />;
    }
    else if (mode === "editRate") {
      body = <EditRate />;
    }
    else if (mode === "apptView") {
      body = <ApptListMaster />;
    }
    else if (mode === "addAppt") {
      body = <AddApptMaster />;
    }
    else if (mode === "addTutor") {
      body = <AddTutor />;
    }
    else if (mode === "addRate") {
      body = <AddRate />;
    }
    else if (mode === "addClient") {
      body = <AddClient />;
    }
    else if (mode === "manageClients") {
      body = <ClientList />;
    }
    else if (mode === "payHistory") {
      body = <PayHistory />;
    }
    else if (mode === "editPayHistory") {
      body = <EditPayHistory />;
    }
    else if (mode === "addPay") {
      body = <AddPayment />;
    }
    else if (mode === "manageTutors") {
      body = <TutorList />;
    }
    else if (mode === "manageRates") {
      body = <RatesList />;
    }
    return (
      <div>
        <RouterMaster />
        {body}
      </div>
      )
  }
});