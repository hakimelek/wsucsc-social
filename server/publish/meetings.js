Meteor.publish('meetings', function () {
  return Meetings.find({}, {sort: {date: -1}});
});
