AdjustmentsView = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		var currentUser = Meteor.user().username;
		return {
			adjustments: Adjustments.findOne(),
		};
	},
	editAdjustments: function() {
		var ap = parseInt(document.getElementById("ap").value);
		var travel = parseInt(document.getElementById("travel").value);
		Meteor.call("editAdjustments", ap, travel);
		this.exit();
	},
	exit: function() {
		Meteor.call("setMode", "apptView");
	},
	render: function() {
		return (
			<div>
				<h1>Billing Adjustments</h1>
				<p>AP: $<input type="text" id="ap" defaultValue={this.data.adjustments.ap} /></p>
				<p>Travel: $<input type="text" id="travel" defaultValue={this.data.adjustments.travel} /></p>
				<p><button className="btn btn-default" onClick={this.exit}>Cancel</button>
					<button className="btn btn-default" onClick={this.editAdjustments}>Submit</button></p>
			</div>
		);
	}
});