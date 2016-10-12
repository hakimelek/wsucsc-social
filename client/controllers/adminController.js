adminController = RouteController.extend({
  subscriptions: function () {
  },

  data: function () {
  },

  detail: function () {
    this.render('admin', { /* data: {} */});
  },

  forgotpwd: function () {
    this.render('forgotPassword')
  },

  resetpwd: function () {
    this.render('resetPassword')
  }
});
