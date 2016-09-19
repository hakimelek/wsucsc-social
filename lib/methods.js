Meteor.methods({
  'addNewMember': function (user) {
    if (Meteor.userId()) {
      user.password = Random.id([15]);
      console.log(user);
      var userId = Accounts.createUser({
                            email : user.email,
                            password : user.password,
                            profile  : {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                status: user.status
                            }
      });

      /**** Send password to user ****/

      if (Meteor.isServer) {

        Roles.addUsersToRoles(userId, ['member']);

        SSR.compileTemplate('welcomeEmail', Assets.getText('Emails/welcomeEmail.html'));

        var emailData = {
          firstName: user.firstName,
          password: user.password,
          email: user.email,
        };

        Email.send({
          to: "mhakim13@winona.edu",
          from: "wsucsc@gmail.com",
          subject: "Welcome to the WSU CS Club Platform 🙌 !",
          html: SSR.render('welcomeEmail', emailData),
        });
      }

    }
  },

  'editMember': function (userId, profile, email) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'officer']) || Meteor.userId() === userId) {
      Meteor.users.update({_id: userId}, {$set: {'profile': profile ,'emails.0.address': email}});

      var status = profile.status;
      if (status == "secretary" || status == "president" || status == "vice-president" || status == "treasurer") {
        Roles.addUsersToRoles(userId, ['officer', 'member']);
      }
      else {
        if (!Roles.userIsInRole(userId, ['admin'])) {
          Roles.setUserRoles(userId, ['member']);
        }
      }

      return;
    }
    throw new Meteor.Error("Operation None Authorized", "You do not have permission to edit this user");
  },

  'removeMember': function (userId) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Meteor.users.remove({_id: userId});
      return userId;
    }
    return  new Meteor.Error("Operation None Authorized", "You do not have permission to remove this user");
  },

  'assignAdmin': function (userId) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Roles.addUsersToRoles(userId, ['officer', 'admin', 'member']);
    }
  },

  'sendEmais': function (email) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin', 'officer'])) {
      for (var i = 0, l = email.to.length; i < l; i++) {
        if (email.to[i]) {
          check(email.to[i], ValidEmail);
        }
      }

      check(email.html, String);
      check(email.subject, String);

      if (Meteor.userId()) {
        Emails.insert(email);

        Email.send({
          from: "wsucsc@gmail.com",
          to: email.to,
          subject: email.subject,
          html: email.html,
        });

      }
    }

    // if (Meteor.isServer) {
    //   SSR.compileTemplate('Email', Assets.getText(email.html));
    //   var emailData = {

    //   };
    //   console.log(SSR.render('Email', emailData));
    // }
  }
});
