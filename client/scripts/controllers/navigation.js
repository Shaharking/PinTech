/**
 * Created by Shahar on 28/03/2016.
 */
myApp.controller('navigationController', ['$scope','$window','$rootScope', 'userService', function($scope,$window,$rootScope, $userService) {

        $scope.isGuest = true;
        $scope.user = {};

        $rootScope.$on('user:logged-in',updateUserDetails);

        function updateUserDetails(){
            $userService.get().success(function(data){
                if(data) {
                    $scope.user = data;
                    $window.sessionStorage.userid = data._id;
                    $scope.isGuest = false;
                }
            });
        }

        updateUserDetails();

}]);