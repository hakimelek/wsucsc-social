Meteor.publish('users', function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, initiated: 1, roles: 1, status: 1}});
  }

  return Meteor.users.find({}, {fields: {emails: 1, profile: 1, initiated: 1, status: 1}});
});

Meteor.publish('user', function (id) {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Meteor.users.find({_id: id}, {fields: {emails: 1, profile: 1, initiated: 1, roles: 1, status: 1}});
  }

  return Meteor.users.find({_id: id}, {fields: {emails: 1, profile: 1, initiated: 1, status: 1}});
});

Meteor.publish(null, function () {
  return Meteor.roles.find({})
});

Meteor.publish('usersById', function (userId) {
  return Meteor.users.find({_id: userId}, {fields: {profile: 1, emails: 1, status: 1}});
});
