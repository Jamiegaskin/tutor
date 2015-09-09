Body = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		var currentUser = Meteor.user().username;
    return {
      session: StateVars.findOne({user: currentUser})
    };
	},
	render: function() {
    var view = this.props.view;
		return (
      <div className="box">
        <div className="row row-offcanvas row-offcanvas-left">
          <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">
            <NavSidebar />
          </div>
          <div className="column col-sm-10 col-xs-11" id="main">
            <header className="navbar navbar-blue navbar-static-top">
              <span className="navbar-brand">{MODE_NAMES[this.data.session.mode]}</span>
							{Meteor.user().profile.status === "Admin"? <MonitorState />:<div/>}
            </header>
            <div className="padding">
              <div className="full">
                {view}
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
});
