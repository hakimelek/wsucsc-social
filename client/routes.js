 var CSClub = angular.module('CSClub'); 

 CSClub.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
 
    $stateProvider
      .state('members', {
        url: '/members',
        templateUrl: 'client/members/allMembers.ng.html'
      })
      .state('addmembers', {
        url: '/addmember',
        templateUrl: 'client/members/addMember.ng.html'
      })
      .state('memberId', {
        url: '/members/:memberId',
        templateUrl: 'client/members/viewmember.ng.html'
      })
      .state('editmember', {
        url: '/members/edit/:memberId',
        templateUrl: 'client/members/editmember.ng.html',
      })
      .state('home', {
        url: '/',
        templateUrl: 'client/core/home.ng.html',
      })
      ;
 
    $urlRouterProvider.otherwise("/");
  });