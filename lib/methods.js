Meteor.methods({
  'addNewMember': function (user) {
    if (Meteor.userId()) {
      user.password = Random.id([15]);
      Accounts.createUser({
                            email : user.email,
                            password : user.password,
                            profile  : {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                status: user.status
                            }
      });

      if (Meteor.isServer) {
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
    if (Meteor.userId()) {
      Meteor.users.update({_id: userId}, {$set: {'profile': profile ,'emails.0.address': email}});
    }
  },

  'removeMember': function (userId) {
    if (Meteor.userId()) {
      Meteor.users.remove({_id: userId});
    }
  },

  'sendEmais': function (email) {
    for (var i = 0, l = email.to.length; i < l; i++) {
      if (email.to[i]) {
        check(email.to[i], ValidEmail);
      }
    }

    check(email.html, String);
    check(email.subject, String);

    if (Meteor.userId()) {
      Emails.insert(email);
    }

    // if (Meteor.isServer) {
    //   SSR.compileTemplate('Email', Assets.getText(email.html));
    //   var emailData = {

    //   };
    //   console.log(SSR.render('Email', emailData));
    // }
  }
});
