
  angular.module('CSClub').controller('headerCtrl', 
   function ($scope, $meteor) {
      console.log('Hey');
  });
 
  angular.module('CSClub').controller('homeCtrl', 
    function($scope){
      $scope.alerts = [
      {
        icon: 'glyphicon-user' ,
        color:'btn-primary' ,
        total: '35' ,
        description: 'TOTAL MEMBERS',
        templateUrl: 'members'
      },

      {
        icon: 'glyphicon-blackboard' ,
        color:'btn-info' ,
        total: '5' ,
        description: 'TOTAL PROJECTS',
        templateUrl: 'projects'

      },
      {
        icon: 'glyphicon-star' ,
        color:'btn-warning' ,
        total: '3' ,
        description: 'TOTAL AWARDS'
      },

      {
        icon: 'glyphicon-align-left' ,
        color:'btn-warning' ,
        total: '1204' ,
        description: 'TOTAL POSTS'
      },

      {
        icon: 'glyphicon-calendar' ,
        color:'btn-success' ,
        total: '3' ,
        description: 'UPCOMING EVENTS'
      },

      {
        icon: 'glyphicon-phone' ,
        color:'btn-primary' ,
        total: '11' ,
        description: 'TOTAL APPS DEVELOPED'
      }

    ];
    }
  );


  angular.module('CSClub').directive('adminHeader', function () {
    return {
      restrict: 'E',
      templateUrl: 'client/core/header.ng.html',
      controllerAs: 'headerCtrl'
    }
  });

  