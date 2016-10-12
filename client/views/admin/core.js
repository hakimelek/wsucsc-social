Template.MasterLayout.helpers({

});

Template.MasterLayout.events({
  'click .logout': function (e, tmpl) {
    Meteor.logout(function (error) {
      if (error) throw error;
      Router.go('home');
    });
  }
});

