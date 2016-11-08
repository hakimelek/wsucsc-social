meetingsController = RouteController.extend({
  subscriptions: function () {
  },

  data: function () {
  },

  showMeeting: function () {
    // this.render('meeting', { /* data: {} */});
    this.render('notFound', { /* data: {} */});
  },

  allMeetings: function () {
    this.render('allMeetings', { /* data: {} */});
  },

  addMeeting: function () {
    // this.render('addMeeting', { /* data: {} */});
    this.render('createMeeting', { /* data: {} */});
  },

  editMeeting: function () {
    // this.render('editMeeting', { /* data: {} */});
    this.render('notFound', { /* data: {} */});
  }
});
