Meteor.publish("emails", function () {
  return Emails.find();
});