NavSidebar = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		return {
			isMaster: Meteor.user().profile.master,
		};
	},
	render: function() {
    if (this.data.isMaster) {
      return (<NavSidebarMaster select={this.select}/>);
    } else {
      return (<NavSidebarTutor select={this.select}/>);
    }
	}
});

NavElem = React.createClass({
	select: function(event) {
    var value = event.target.dataset.nav;
    if (value === "logout"){
      Meteor.logout()
      return;
    }
    else if (value === "nav") {
      return;
    }
    Meteor.call("setMode", value);
  },
	render: function() {
		return (
			<li role="presentation">
				<a href="#" data-nav={this.props.nav} onClick={this.select}>{this.props.children}</a>
			</li>
		);
	}
});

NavSidebarTutor = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
    var currentUser = Meteor.user().username;
    return {username: currentUser};
	},
	render: function() {
    var username = this.data.username;
		return (
      <div className="">
        <span>{username}</span>
        <nav className="">
          <ul className="nav nav-pills nav-stacked">
            <NavElem nav="nav">Navigation</NavElem>
						<NavElem nav="addAppt">Add Appointment</NavElem>
						<NavElem nav="apptView">Appointment List</NavElem>
						<NavElem nav="editPass">Edit Password</NavElem>
						<NavElem nav="logout">Log Out</NavElem>
          </ul>
        </nav>
      </div>
		);
	}
});

NavSidebarMaster = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		var currentUser = Meteor.user().username;
    return {username: currentUser};
	},
	render: function() {
    var username = this.data.username;
		return (
      <div className="">
        <span>{username}</span>
        <nav className="">
          <ul className="nav nav-pills nav-stacked">
						<NavElem nav="nav">Navigation</NavElem>
						<NavElem nav="addAppt">Add Appointment</NavElem>
						<NavElem nav="apptView">Appointment List</NavElem>
						<NavElem nav="addPay">Add Payment</NavElem>
						<NavElem nav="addPayExtra">Add Tutor Pay Extra</NavElem>
						<NavElem nav="managePayExtra">Manage Tutor Pay Extras</NavElem>
						<NavElem nav="addBillExtra">Add Bill Extra</NavElem>
						<NavElem nav="manageBillExtra">Manage Bill Extras</NavElem>
						<NavElem nav="addRate">Add Rate</NavElem>
						<NavElem nav="manageRates">Manage Rates</NavElem>
						<NavElem nav="addClient">Add Client</NavElem>
						<NavElem nav="manageClients">Manage Clients</NavElem>
						<NavElem nav="addTutor">Add Tutor</NavElem>
						<NavElem nav="manageTutors">Manage Tutors</NavElem>
						<NavElem nav="manageBillAdjustments">Manage Billing Adjustments</NavElem>
						<NavElem nav="addCycle">Add Billing Cycle</NavElem>
						<NavElem nav="manageCycles">Manage Billing Cycles</NavElem>
						<NavElem nav="editPass">Edit Password</NavElem>
						<NavElem nav="logout">Log Out</NavElem>
          </ul>
        </nav>
      </div>
		);
	}
});
