projectsController = RouteController.extend({
  subscriptions: function () {
  },

  data: function () {
  },

  createProject: function () {
    this.render('createProject');
  },

  showProject: function () {
    this.render('showProject');
  },

  editProject: function () {
    this.render('editProject');
  },

  allProjects: function () {
    this.render('allProjects');
  }
});
