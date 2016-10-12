// Assign the first user the administration
Accounts.onCreateUser(function (options, user) {
  user.profile = options.profile || {};
  user.roles = ['member'];

  var status = user.profile.status;
  if (status === 'secretary' || status === 'president' || status === 'vice-president' || status === 'treasurer') {
    user.roles = ['officer', 'member'];
  }

  if (Meteor.users.find().count() === 0) {
    user.roles = ['admin', 'member'];
  }

  return user;
});
