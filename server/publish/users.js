Meteor.publish("users", function () {
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1, initiated: 1}});
});

Meteor.publish("user", function (id) {
  return Meteor.users.find({_id: id}, {fields: {emails: 1, profile: 1, initiated: 1}});
});
