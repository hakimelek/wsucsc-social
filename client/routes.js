var OnBeforeActions;

OnBeforeActions = {
  loginRequired: function (pause) {
    if (!Meteor.userId()) {
      Router.go('admin');
      return;
    }
    this.next();
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  except: ['admin', 'home', 'contact', 'blog', 'constitution']
});

Router.configure({
  layoutTemplate: 'MasterLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.render('home');
}, {
  name: 'home'
});

Router.route('/contact', function () {
  this.render('contact');
}, {
  name: 'contact'
});

Router.route('/blog', function () {
  this.render('blog');
}, {
  name: 'blog'
});

Router.route('/constitution', function () {
  this.render('constitution');
}, {
  name: 'constitution'
});

Router.route('/admin', {
  name: 'admin',
  controller: 'adminController',
  where: 'client'
});

Router.route('/account/resetpwd', {
  name: 'resetpwd',
  controller: 'adminController',
  where: 'client',
  action: 'resetpwd'
});

Router.route('/account/forgotpwd', {
  name: 'forgotpwd',
  controller: 'adminController',
  where: 'client',
  action: 'forgotpwd'
});

Router.route('/members', {
  name: 'members',
  controller: 'membersController',
  action: 'showMembers',
  where: 'client'
});

Router.route('/members/addmember', {
  name: 'member.add',
  controller: 'membersController',
  action: 'addMember',
  where: 'client'
});

Router.route('/members/:_id/editmember', {
  name: 'member.edit',
  controller: 'membersController',
  action: 'editMember',
  where: 'client'
});

Router.route('/members/:_id', {
  name: 'member.show',
  controller: 'membersController',
  action: 'showMember',
  where: 'client'
});

Router.route('/emails/send', {
  name: 'email.send',
  controller: 'emailsController',
  action: 'sendEmail',
  where: 'client'
});

Router.route('/emails', {
  name: 'emails',
  controller: 'emailsController',
  action: 'allEmails',
  where: 'client'
});

Router.route('/emails/list', {
  name: 'emails.emaillist',
  controller: 'emailsController',
  action: 'getEmailList',
  where: 'client'
});

Router.route('/projects/create', {
  name: 'project.create',
  controller: 'projectsController',
  action: 'createProject',
  where: 'client'
});

Router.route('/projects/:_id', {
  name: 'project.show',
  controller: 'projectsController',
  action: 'showProject',
  where: 'client'
});

Router.route('/projects/:_id/edit', {
  name: 'project.edit',
  controller: 'projectsController',
  action: 'editProject',
  where: 'client'
});


