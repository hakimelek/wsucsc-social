Meteor.publish("messages", function (limit) {
  if (this.userId) {
    return Messages.find({}, { sort: { createdAt: 1}});
  }
});

Meteor.publish('usersById', function (userId) {
  return Meteor.users.find({_id: userId}, {fields: {profile: 1}});
});