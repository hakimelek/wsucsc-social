Template.forgotPassword.events({
  'submit #forgotPasswordForm': function (e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
        }
      });
    }
    return false;
  }
});

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.resetPassword.helpers({
  resetPassword: function(){
    return Session.get('resetPassword');
  }
});

Template.resetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
    password = resetPasswordForm.find('#resetPasswordPassword').val(),
    passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    return false;
  }
});