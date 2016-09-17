 var CSClub = angular.module('CSClub', ['angular-meteor', 'ui.router', 'accounts.ui', 'angularUtils.directives.dirPagination']); 


function onReady(){
	angular.bootstrap(document, ['CSClub']); 
}


if(Meteor.isCordova){
	angular.element(document).on("deviceready", onReady)
}
else
	angular.element(document).ready(onReady)