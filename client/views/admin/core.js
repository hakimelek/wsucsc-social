Template.MasterLayout.helpers({

});

Template.MasterLayout.events({
  'click .logout': function (e, tmpl) {
    Meteor.logout(function(error){
      Router.go('home');
    });
  }
});

