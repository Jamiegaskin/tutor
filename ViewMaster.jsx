ViewMaster = React.createClass({
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
    else if (mode === "manageBillAdjustments") {
      body = <AdjustmentsView />;
    }
    else if (mode === "addCycle") {
      body = <AddCycle />;
    }
    else if (mode === "manageCycles") {
      body = <CyclesList />;
    }
    else if (mode === "addPayExtra") {
      body = <AddPayExtra />;
    }
    else if (mode === "managePayExtra") {
      body = <PayExtraList />;
    }
    else if (mode === "addBillExtra") {
      body = <AddBillExtra />;
    }
    else if (mode === "manageBillExtra") {
      body = <BillExtraList />;
    }
    return (
      <div>
        {body}
      </div>
      )
  }
});
