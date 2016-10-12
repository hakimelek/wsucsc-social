Template.home.onCreated(function () {
  setTimeout(function () {
    $('.element').typed({
      strings: ['Hi!', 'CSC is a group of students who focuses on solving logic problems and expanding their knowledge about technology...'],
      typeSpeed: 0,
      backDelay: 2000
    });
  }, 1000);
});

Template.contact.events({
  'submit .messageUs': function (event, template) {
    event.preventDefault();

    var firstName = event.target.firstName.value;
    var lastName = event.target.lastName.value;
    var email = event.target.email.value;
    var message = event.target.message.value;

    var messageUs = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'message': message
    }

    swal({ title: 'Are you sure?', text: 'Once confirmed, your message will be sent to us!', type: 'warning', showCancelButton: true, confirmButtonColor: '#512F92', confirmButtonText: 'Yes, send it!', closeOnConfirm: false }, function () {
      Meteor.call('messageUs', messageUs, function (error, response) {
        if (error) throw error;
        swal('Sent!', 'We got your message!', 'success');
      });
    });

    return false;
  }
});
