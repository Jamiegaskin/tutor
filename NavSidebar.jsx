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
				<a href="#" data-nav={this.props.nav} onClick={this.select}>{MODE_NAMES[this.props.nav]}</a>
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
						<NavElem nav="addAppt"/>
						<NavElem nav="apptView"/>
						<NavElem nav="editPass"/>
						<NavElem nav="logout"/>
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
						<NavElem nav="addAppt" />
						<NavElem nav="apptView"/>
						<NavElem nav="addPay"/>
						<NavElem nav="addPayExtra"/>
						<NavElem nav="managePayExtra"/>
						<NavElem nav="addBillExtra"/>
						<NavElem nav="manageBillExtra"/>
						<NavElem nav="addRate"/>
						<NavElem nav="manageRates"/>
						<NavElem nav="addClient"/>
						<NavElem nav="manageClients"/>
						<NavElem nav="addTutor"/>
						<NavElem nav="manageTutors"/>
						<NavElem nav="manageBillAdjustments"/>
						<NavElem nav="addCycle"/>
						<NavElem nav="manageCycles"/>
						<NavElem nav="editPass"/>
						<NavElem nav="logout"/>
          </ul>
        </nav>
      </div>
		);
	}
});
