emailsController = RouteController.extend({
  subscriptions: function () {
  },

  data: function () {
  },

  sendEmail: function () {
    this.render('sendEmail', { /* data: {} */});
  },

  allEmails: function () {
    this.render('allEmails');
  }
});
