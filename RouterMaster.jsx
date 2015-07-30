RouterMaster = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
    var currentUser = Meteor.user().username
    return {
      userID: StateVars.findOne({user: currentUser})._id
    };
  },
  getInitialState: function() {
    return {expand: false};
  },
  expand: function() {
    this.setState({expand: true})
  },
  enterEmailEdit: function() {
    StateVars.update(this.data.userID, {$set: {mode: "editEmail"}});
  },
  render: function() {
    if (!this.state.expand) {
      return <button onClick={this.expand}>router</button>;
    } else {
      return (
        <ul>
          <li><button onClick={this.enterEmailEdit}>Edit Email</button></li>
          <li><button onClick={Meteor.logout}>logout</button></li>
        </ul>
        );
    }
  }
});