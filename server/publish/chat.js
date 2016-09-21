Meteor.publish("messages", function (limit) {
  if (this.userId) {
    return Messages.find({}, { sort: { createdAt: 1}});
  }
});
