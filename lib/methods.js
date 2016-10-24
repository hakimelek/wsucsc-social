Meteor.methods({
  'messageUs': function (item) {
    Messages.insert({
      senderId: '',
      text: 'MESSAGE FROM CONTACT PAGE\n' + item.message + '\n --- from ' + item.firstName + ' ' + item.lastName + ' (' + item.email + ')',
      createdAt: new Date()
    }, function (err, results) {
      if (err) throw err;
    });
  },

  'addNewMember': function (user) {
    if (Meteor.userId()) {
      user.password = Random.id([15]);

      var userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status
        }
      });

      /** Send password to user **/

      if (Meteor.isServer) {
        Roles.addUsersToRoles(userId, ['member']);

        SSR.compileTemplate('welcomeEmail', Assets.getText('Emails/welcomeEmail.html'));

        var emailData = {
          firstName: user.firstName,
          password: user.password,
          email: user.email
        };

        Email.send({
          to: emailData.email,
          from: 'contact@wsucs.club',
          subject: 'Welcome to the WSU CS Club Platform 🙌 !',
          html: SSR.render('welcomeEmail', emailData)
        });
      }
    }
  },

  'editMember': function (userId, profile, email) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'officer']) || Meteor.userId() === userId) {
      Meteor.users.update({_id: userId}, {$set: {'profile': profile, 'emails.0.address': email}});

      var status = profile.status;
      if (status === 'secretary' || status === 'president' || status === 'vice-president' || status === 'treasurer') {
        Roles.addUsersToRoles(userId, ['officer', 'member']);
      }
      else {
        if (!Roles.userIsInRole(userId, ['admin'])) {
          Roles.setUserRoles(userId, ['member']);
        }
      }

      return;
    }
    throw new Meteor.Error('Operation None Authorized', 'You do not have permission to edit this user');
  },

  'removeMember': function (userId) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Meteor.users.remove({_id: userId});
      return userId;
    }
    return new Meteor.Error('Operation None Authorized', 'You do not have permission to remove this user');
  },

  'assignAdmin': function (userId) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Roles.addUsersToRoles(userId, ['officer', 'admin', 'member']);
    }
  },

  'setPassword': function (newPassword, userId) {
    if (Meteor.userId()) {
      if (Meteor.isServer) {
        Accounts.setPassword(userId, newPassword, function (error, response) {
          if (error) throw error;
        });
      }
    }
  },

  'chngPassword': function (oldPassword, newPassword) {
    if (Meteor.userId()) {
      if (Meteor.isClient) {
        Accounts.changePassword(oldPassword, newPassword, function (error, response) {
          if (error) throw error;
        });
      }
    }
  },

  'sendEmais': function (email) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'officer'])) {
      check(email.html, String);
      check(email.subject, String);

      console.log(email.to);

      // send emails to all active members
      if (email.to.indexOf('all') > -1) {
        email.to.splice(email.to.indexOf('all'), 1);
        var activeMembers = Meteor.users.find({
          $or: [
            { 'profile.status': 'active' }, {'profile.status': 'new'}, {'profile.status': 'president'}, {'profile.status': 'secretary'}, {'profile.status': 'public-relations'}, {'profile.status': 'vice-president'}, {'profile.status': 'treasurer'}
          ]
        }, {fields: {emails: 1}}).fetch();
        for (var i = 0, len = activeMembers.length; i < len; i++) {
          email.to.push(activeMembers[i].emails[0].address);
        }
      }

      // send emails to all active members
      if (email.to.indexOf('board') > -1) {
        email.to.splice(email.to.indexOf('board'), 1);
        var board = Meteor.users.find({
          $or: [
            {'profile.status': 'president'}, {'profile.status': 'secretary'}, {'profile.status': 'public-relations'}, {'profile.status': 'vice-president'}, {'profile.status': 'treasurer'}
          ]
        }, {fields: {emails: 1}}).fetch();
        for (var i = 0, len = board.length; i < len; i++) {
          email.to.push(board[i].emails[0].address);
        }
      }

      // send emails to all inactive members
      if (email.to.indexOf('inactive') > -1) {
        email.to.splice(email.to.indexOf('inactive'), 1);
        var inactiveMembers = Meteor.users.find({'profile.status': 'inactive'}, {fields: {emails:1}}).fetch();
        for (var i = 0, len = inactiveMembers.length; i < len; i++) {
          email.to.push(inactiveMembers[i].emails[0].address);
        }
      }

      // send emails to all past members
      if (email.to.indexOf('pastMembers') > -1) {
        email.to.splice(email.to.indexOf('inactive'), 1);
        var pastMembers = Meteor.users.find({'profile.status': 'past-member'}, {fields: {emails:1}}).fetch();
        for (var i = 0, len = pastMembers.length; i < len; i++) {
          email.to.push(pastMembers[i].emails[0].address);
        }
      }

      // send emails to Every Single member
      if (email.to.indexOf('everySingleMember')> -1) {
        email.to.splice(email.to.indexOf('everySingleMember'), 1);
        var allMembers = Meteor.users.find({}, {fields: {emails: 1}}).fetch();
        for (var i = 0, len = allMembers.length; i < len; i++) {
          email.to.push(allMembers[i].emails[0].address);
        }
      }

      // get unique emails
      function onlyUnique (value, index, self) {
        return self.indexOf(value) === index;
      }

      email.to = email.to.filter(onlyUnique);

      // validate all emails
      for (var i = 0, l = email.to.length; i < l; i++) {
        if (email.to[i]) {
          check(email.to[i], ValidEmail);
        }
      }

      if (Meteor.userId()) {
        Emails.insert(email);

        Email.send({
          from: 'contact@wsucs.club',
          to: email.to,
          subject: email.subject,
          html: email.html
        });
      }
    }

    // if (Meteor.isServer) {
    //   SSR.compileTemplate('Email', Assets.getText(email.html));
    //   var emailData = {

    //   };
    //   console.log(SSR.render('Email', emailData));
    // }
  },

  sendMessage: function (message) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      senderId: Meteor.userId(),
      text: message,
      createdAt: new Date()
    }, function (err, results) {
      if (err) throw err;
    });
  },

  createProject: function (project) {
    check(project.name, String);
    check(project.description, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Projects.insert({
      name: project.name,
      description: project.description,
      createdAt: new Date(),
      ownerId: Meteor.userId(),
      collaborators: [Meteor.userId()]
    }, function (err, results) {
      if (err) throw err;
    });
  },

  editProject: function (projectId, project) {
    check(project.name, String);
    check(project.description, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Projects.update({_id: projectId}, {
      $set: {name: project.name, description: project.description}
    }, function (err, results) {
      if (err) throw err;
    });
  },

  'joinProject': function (projectId) {
    var project = Projects.findOne({_id: projectId}, {collaborators: {$elemMatch: {$eq: Meteor.userId()}}});
    if (!project) throw new Meteor.Error(500,
      'You cannot join a project that you have already joined');

    Projects.update({_id: projectId}, { $push: {collaborators: Meteor.userId()} },
      function (error, response) {
        if (error) throw error;
        return response;
      }
    );
  },

  'leaveProject': function (projectId) {
    var project = Projects.findOne({_id: projectId}, {collaborators: {$elemMatch: {$eq: Meteor.userId()}}});
    if (!project) throw new Meteor.Error(500, 'You cannot leave a project that you have already left');

    Projects.update({_id: projectId}, { $pull: {collaborators: Meteor.userId()} },
      function (error, response) {
        if (error) throw error;
        return response;
      }
    );
  }
});
