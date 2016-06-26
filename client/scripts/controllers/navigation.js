/**
 * Created by Shahar on 28/03/2016.
 */
myApp.controller('navigationController', ['$scope','$window','$rootScope', function($scope,$window,$rootScope) {

        $scope.isGuest = true;
        $scope.username = "";

        $rootScope.$on('user:logged-in',updateUserDetails);

        function updateUserDetails(){
            var today =  new Date().getTime();
            var expiredDate = new Date($window.sessionStorage.timestap).getTime();
            if($window.sessionStorage.username && today <= expiredDate){
                    $scope.username = $window.sessionStorage.username;
                    $scope.isGuest = false;
            }
            else{
                $scope.isGuest = true;
            }
        }

        updateUserDetails();

}]);