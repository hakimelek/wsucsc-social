membersController = RouteController.extend({
  subscriptions: function () {
  },

  data: function () {
  },

  showMembers: function () {
    this.render('members', { /* data: {} */});
  },

  showMember: function () {
    this.render('showMember', { /* data: {} */});
  },

  addMember: function () {
    this.render('addMember', { /* data: {} */});
  },

  editMember: function () {
    this.render('editMember', { /* data: {} */});
  }


});
