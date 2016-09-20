Template.sendEmail.helpers({
  'members': function () {
    return Meteor.users.find();
  },

  getContext: function () {
    return {
      // Set html content
      inlineMode: false,

      // Set Input Box height
      heightMin: 270,

      // _value: self.note,
      _keepMarkers: true,
      toolbarInline: true,
      initOnClick: false,
      tabSpaces: false,

      // FE save.before event handler function:
      "_onsave.before": function (e, editor) {
        var newHTML = editor.html.get(true /* keep_markers */);
        // Do something to update the edited value
        // if (!_.isEqual(newHTML, self.note.body)) {
        //   Meteor.call('saveNote', { body: newHTML })
        // }
        return false; // Stop Froala Editor from POSTing to the Save URL
      },
    }
  },
});

Template.sendEmail.events({
  'submit .sendEmail': function(event, template) {
    event.preventDefault();

    var message = template.$('div.froala-reactive-meteorized').froalaEditor('html.get', true);

    var selectedEmail = event.target.emails;
    var subject = event.target.subject.value;

    var emails = [];
    for (var i = 0, l = selectedEmail.length; i < l; i++) {
      if (selectedEmail[i].selected) {
        emails.push(selectedEmail[i].value);
      }
    }

    var email = {
      'html': message,
      'to': emails,
      'subject': subject,
    }

    Meteor.call('sendEmais', email, function (error, response) {
      if (error) throw error;
      Router.go('emails');
    });
  }
});

Template.sendEmail.onCreated(function () {
  var self = this;
  var controller = Router.current();
  self.autorun(function () {
    self.subscribe('users');
  });
});

Template.sendEmail.onRendered(function () {
  $(".selectEmails").select2({
    width: '100%'
  });
});

/* ALL EMAILS */

Template.allEmails.helpers({
  'emails': function () {
    return Emails.find();
  }
});

Template.allEmails.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('emails');
  });
});


/* EMAIL LIST */

Template.emailList.helpers({
  'users': function () {
    return Meteor.users.find();
  }
});

Template.emailList.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('users');
  });
});
