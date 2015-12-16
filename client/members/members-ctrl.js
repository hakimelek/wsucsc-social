
  angular.module('CSClub').controller('MembersCtrl', 
   function ($scope, $meteor) {

	   Meteor.subscribe("members");

    $scope.members = $meteor.collection(Members); 
   
   	$scope.remove = function(member){
   		$scope.members.splice($scope.members.indexOf(member), 1);
   	}
   
  });

  angular.module('CSClub').controller('MembersCtrlDetails',
  	function($scope, $stateParams, $meteor){

  		$scope.member = $meteor.object(Members,$stateParams.memberId, false).subscribe("members");

  		$scope.save = function(){
  			$scope.member.save().then(function(numberofDocs){
  				console.log('success', numberofDocs);
  			}, function(error){
  				console.log('error', error);
  			}); 

  		};

  		$scope.reset = function(){
  			$scope.member.reset(); 
  		}

      $scope.users = $meteor.collection(Meteor.users, false).subscribe("users"); 

  });
 

 

