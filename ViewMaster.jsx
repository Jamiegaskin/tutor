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
    else if (mode === "cyclesForBilling") {
      body = <CyclesForBilling />;
    }
    else if (mode === "reviewBill") {
      body = <SingleBillReview />;
    }
    else if (mode === "singleCycleForBilling") {
      body = <SingleCycleForBilling />;
    }
    else if (mode === "cycleBillList") {
      body = <CycleBillList />;
    }
    else if (mode === "cyclesForPaying") {
      body = <CyclesForPaying />;
    }
    else if (mode === "reviewPay") {
      body = <SinglePayReview />;
    }
    else if (mode === "singleCycleForPaying") {
      body = <SingleCycleForPaying />;
    }
    else if (mode === "cyclePayList") {
      body = <CyclePayList />;
    }
    return (
      <div>
        {body}
      </div>
      )
  }
});
