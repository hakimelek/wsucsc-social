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
      '_onsave.before': function (e, editor) {
        return false; // Stop Froala Editor from POSTing to the Save URL
      }
    }
  }
});

Template.sendEmail.events({
  'submit .sendEmail': function (event, template) {
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
      'subject': subject
    }

    swal({ title: 'Are you sure?', text: 'Once confirmed, an email will be sent to the selected members!', type: 'warning', showCancelButton: true, confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, send it!', closeOnConfirm: false }, function () {
      Meteor.call('sendEmais', email, function (error, response) {
        if (error) {
          swal('Oups!', 'Something went wront, ask the guy who is maintaining the site', 'error');
          throw error;
        }
        Router.go('emails');
        swal('Sent!', 'Your email has been sent!', 'success');
      });
    });
  }
});

Template.sendEmail.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('users');
  });
});

Template.sendEmail.onRendered(function () {
  $('.selectEmails').select2({
    width: '100%',
    templateResult: function (data, container) {
      if (data.element) {
        $(container).addClass($(data.element).attr('class'));
      }
      return data.text;
    }
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
