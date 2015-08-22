NavSidebar = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		return {
			isMaster: Meteor.user().profile.master,
		};
	},
	render: function() {
    if (this.data.isMaster) {
      return (<NavSidebarMaster />);
    } else {
      return (<NavSidebarTutor />);
    }
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
            <li role="presentation" className="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Profile</a></li>
            <li role="presentation"><a href="#">Messages</a></li>
          </ul>
        </nav>
      </div>
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
            <li role="presentation" className="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Profile</a></li>
            <li role="presentation"><a href="#">Messages</a></li>
          </ul>
        </nav>
      </div>
		);
	}
});
