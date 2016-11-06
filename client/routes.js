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
  except: [
    'admin',
    'home',
    'contact',
    'blog',
    'constitution',
    'hackathon',
    'members.front',
    'projects.front',
    'project.show.front'
  ]
});

Router.configure({
  layoutTemplate: 'MasterLayout',
  notFoundTemplate: 'notFound'
});

/** ******** TEMPORARY ROUTING ******* **/

Router.route('/', function () {
  this.render('hackathon');
}, {
  name: 'hackathon'
});

/** ******** FRONT SITE ROUTING ******* **/

Router.route('/home', function () {
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
  name: 'members.front',
  controller: 'membersController',
  action: 'allMembersFront',
  where: 'client'
});

Router.route('/projects/', {
  name: 'projects.front',
  controller: 'projectsController',
  action: 'allProjectsFront',
  where: 'client'
});

Router.route('/projects/:_id', {
  name: 'project.show.front',
  controller: 'projectsController',
  action: 'showProjectFront',
  where: 'client'
});

/** ******** ADMIN ROUTING ******* **/

/** ** MEMBERS ** **/

Router.route('admin/members', {
  name: 'members',
  controller: 'membersController',
  action: 'showMembers',
  where: 'client'
});

Router.route('admin/members/addmember', {
  name: 'member.add',
  controller: 'membersController',
  action: 'addMember',
  where: 'client'
});

Router.route('admin/members/:_id/editmember', {
  name: 'member.edit',
  controller: 'membersController',
  action: 'editMember',
  where: 'client'
});

Router.route('admin/members/:_id', {
  name: 'member.show',
  controller: 'membersController',
  action: 'showMember',
  where: 'client'
});

/** ** EMAILS ** **/

Router.route('admin/emails/send', {
  name: 'email.send',
  controller: 'emailsController',
  action: 'sendEmail',
  where: 'client'
});

Router.route('admin/emails', {
  name: 'emails',
  controller: 'emailsController',
  action: 'allEmails',
  where: 'client'
});

Router.route('admin/emails/list', {
  name: 'emails.emaillist',
  controller: 'emailsController',
  action: 'getEmailList',
  where: 'client'
});

/** ** PROJECTS ** **/

Router.route('admin/projects/', {
  name: 'projects',
  controller: 'projectsController',
  action: 'allProjects',
  where: 'client'
});

Router.route('admin/projects/create', {
  name: 'project.create',
  controller: 'projectsController',
  action: 'createProject',
  where: 'client'
});

Router.route('admin/projects/:_id', {
  name: 'project.show',
  controller: 'projectsController',
  action: 'showProject',
  where: 'client'
});

Router.route('admin/projects/:_id/edit', {
  name: 'project.edit',
  controller: 'projectsController',
  action: 'editProject',
  where: 'client'
});

/** ** MEETINGS ** **/

Router.route('admin/meetings', {
  name: 'meetings',
  controller: 'meetingsController',
  action: 'allMeetings',
  where: 'client'
});

Router.route('admin/meetings/addmeeting', {
  name: 'meeting.add',
  controller: 'meetingsController',
  action: 'addMeeting',
  where: 'client'
});

Router.route('admin/meetings/:_id/editmeeting', {
  name: 'meeting.edit',
  controller: 'meetingsController',
  action: 'editMeeting',
  where: 'client'
});

Router.route('admin/meetings/:_id', {
  name: 'meeting.show',
  controller: 'meetingsController',
  action: 'showMeeting',
  where: 'client'
});
