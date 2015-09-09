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
			<li role="presentation" className="nav-elem">
				<a href="#" data-nav={this.props.nav} onClick={this.select}>{MODE_NAMES[this.props.nav]}</a>
			</li>
		);
	}
});

NavSection = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		var currentUser = Meteor.user().username;
    return {
      session: StateVars.findOne({user: currentUser})
    };
	},
	select: function() {
		Meteor.call('setNav', this.props.name);
	},
	render: function() {
		var shown = this.data.session.nav === this.props.name || this.props.name === "default";
		var titleDisplay = this.props.name !== "default" ? "" : "gone";
		var menuDisplay = shown ? "" : "gone";
		return (
			<nav className="">
				<h4 className={titleDisplay}>
					<a href="#" onClick={this.select}>
						{NAV_SECTION_NAMES[this.props.name]}
					</a>
				</h4>
				<ul className={"nav nav-pills nav-stacked " + menuDisplay}>
					{this.props.children}
				</ul>
			</nav>
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
        <h2>{username}</h2>
        <NavSection name="default">
						<NavElem nav="addAppt"/>
						<NavElem nav="apptView"/>
						<NavElem nav="editPass"/>
						<NavElem nav="logout"/>
        </NavSection>
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
        <h2>{username}</h2>
        		<NavSection name="appts">
        				<NavElem nav="addAppt" />
						<NavElem nav="apptView"/>
        		</NavSection>
				<NavSection name="tutors">
						<NavElem nav="addTutor"/>
						<NavElem nav="manageTutors"/>
				</NavSection>
				<NavSection name="clients">
						<NavElem nav="addClient"/>
						<NavElem nav="manageClients"/>
				</NavSection>
				<NavSection name="rates">
						<NavElem nav="addRate"/>
						<NavElem nav="manageRates"/>
				</NavSection>
				<NavSection name="cycles">
						<NavElem nav="addCycle"/>
						<NavElem nav="manageCycles"/>
				</NavSection>
				<NavSection name="billing">
						<NavElem nav="cyclesForBilling"/>
						<NavElem nav="addPay"/>
						<NavElem nav="addBillExtra"/>
						<NavElem nav="manageBillExtra"/>
						<NavElem nav="manageBillAdjustments"/>
				</NavSection>
				<NavSection name="payStubs">
						<NavElem nav="cyclesForPaying"/>
						<NavElem nav="addPayExtra"/>
						<NavElem nav="managePayExtra"/>
				</NavSection>
				<hr/>
       	<NavSection name="default">
						<NavElem nav="editPass"/>
						<NavElem nav="logout"/>
        </NavSection>
      </div>
		);
	}
});
