Appts = new Mongo.Collection("appts")
Rates = new Mongo.Collection("rates")

import Global from "./Global.jsx";
import SingleApptTutor from "./SingleApptTutor.jsx";
import SinglApptMaster from "./SinglApptMaster.jsx";

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<Global />, document.body);
  });
}
