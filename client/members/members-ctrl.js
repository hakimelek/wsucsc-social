
  angular.module('CSClub').controller('MembersCtrl', 
   function ($scope, $meteor) {


      $scope.page = 1; 
      $scope.perPage = 5; 
      $scope.sort = {timestamp: 1}; 
      //$scope.orderProperty = '1'; 

      $scope.members = $meteor.collection(function(){
        return Members.find({}, {
          sort: $scope.getReactively('sort')
        });
      }); 

     $meteor.autorun($scope, function(){
        $meteor.subscribe("members", {
                limit: parseInt($scope.getReactively('perPage')),
                skip: parseInt(($scope.getReactively('page') - 1)* $scope.getReactively('perPage')), 
                sort: $scope.getReactively('sort')
             }, $scope.getReactively('searchText')).then(function(){
                $scope.membersCounts = $meteor.object(Counts, 'numberOfMembers', false); 
             });
     });
   
   	$scope.remove = function(member){
   		$scope.members.splice($scope.members.indexOf(member), 1);
   	}

    $scope.newMember= {
         timestamp: (new Date()).getTime()
    }

    $scope.addMember = function(){
          Members.insert($scope.newMember); 
      };

    $scope.pageChanged =function(newPage){
        $scope.page = newPage; 
    }

  /*  $scope.$watch('orderProperty', function(){
      if($scope.orderProperty){
        $scope.sort = {timestamp: parseInt($scope.orderProperty)}
      }
    });

*/



  });

 /* angular.module('CSClub').controller('AddMemberCtrl', 
   function ($scope) {
      $scope.newMember= {
         timestamp: new Date(),
         //owner: $scope.$root.currentUser._id,
         addMember: function(){
            $scope.members.push($scope.newMember);
         }
       }; 

      console.log($scope.newMember);

      $scope.addMember = function(){
          console.log($scope.newMember);
          $scope.members.push($scope.newMember); 
      };
   });
*/


  angular.module('CSClub').controller('MembersCtrlDetails',
  	function($scope, $stateParams, $meteor){


  		$scope.member = $meteor.object(Members,$stateParams.memberId, false);

      var subscriptionHandle; 

      $meteor.subscribe("members").then(function(handle){
          subscriptionHandle = handle; 
      });



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

      $scope.$on('$destroy', function(){
        subscriptionHandle.stop(); 
      });
  });
 

 

