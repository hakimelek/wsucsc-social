/* ALL MEMBERS */

Template.members.helpers({
  'members': function () {
    return Meteor.users.find();
  },

  initiated: function () {
    return moment(this.initiated).fromNow();
  },

  isMe: function () {
    return this._id === Meteor.userId();
  },

  isMeOrAdmin: function () {
    return this._id === Meteor.userId() || Roles.userIsInRole(Meteor.user(),
                            ['admin', 'officer']);
  },

  role: function () {
    if (Roles.userIsInRole(this._id, ['admin'])) return "Admin";
    else if (Roles.userIsInRole(this._id, ['officer']) && !Roles.userIsInRole(this._id, ['admin'])) return "Officer";
  },

  userIsOfficer: function () {
    return Roles.userIsInRole(this._id, ['admin']);
  }
});


Template.members.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('users');
  });
});

/* SHOW MEMBER */

Template.showMember.helpers({
  'member': function () {
    var controller = Router.current();
    return Meteor.users.findOne({_id:  controller.params._id});
  },
  isMe: function () {
    return this._id === Meteor.userId();
  },

  isMeOrAdmin: function () {
    return this._id === Meteor.userId() || Roles.userIsInRole(Meteor.user(),
                            ['admin', 'officer']);
  },
});

Template.showMember.onCreated(function () {
  var self = this;
  var controller = Router.current();
  self.autorun(function () {
    self.subscribe('user', controller.params._id);
  });
});

/* EDIT MEMBER */

Template.editMember.helpers({
  'member': function () {
    var controller = Router.current();
    return Meteor.users.findOne({_id:  controller.params._id});
  },

  isNotAdmin: function () {
    return !Roles.userIsInRole(this._id,
                            ['admin']);
  }
});

Template.editMember.events({
  'submit .editMember': function(event, template) {
    event.preventDefault();

    var firstName = event.target.firstName.value;
    var lastName = event.target.lastName.value;
    var email = event.target.email.value;
    var status;

    if (event.target.status) {
      status = event.target.status.value;
    } else {
      status = this.profile.status;
    }

    var controller = Router.current();

    var profile = {
      'firstName': firstName,
      'lastName': lastName,
      'status': status,
    }

    Meteor.call('editMember', controller.params._id, profile, email, function (error, response) {
      if (error) throw error;
      Router.go('members');
    });
  },

  'click .removeMember': function (event, template) {
    event.preventDefault();

    var controller = Router.current();

    Meteor.call('removeMember', controller.params._id, function (error, response) {
      if (error) throw error;
      Router.go('members');
    });
  },

  'click .setAdmin': function (event, template) {
    var controller = Router.current();

    Meteor.call('assignAdmin', controller.params._id, function (error, response) {
      if (error) throw error;
      Router.go('members');
    });

  }
});

Template.editMember.onCreated(function () {
  var self = this;
  var controller = Router.current();
  self.autorun(function () {
    self.subscribe('user', controller.params._id);
  });
});

/* ADD A MEMBER */

Template.addMember.helpers({

});

Template.addMember.events({
  'submit .addMember': function(event, template) {
    event.preventDefault();

    var firstName = event.target.firstName.value;
    var lastName = event.target.lastName.value;
    var email = event.target.email.value;
    var status = event.target.status.value;

    var user = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'status': status,
    }

    Meteor.call('addNewMember', user, function (error, response) {
      if (error) throw error;
      Router.go('members');
    });
    return false;
  }
});

Template.addMember.onCreated(function () {
  var self = this;
  self.autorun(function () {

  });
});

AccountsTemplates.configure({
    texts: {
      title: {
        signUp: "Become a member",
      }
    }
});



