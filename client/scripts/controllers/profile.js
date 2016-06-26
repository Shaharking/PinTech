/**
 * Created by Shahar on 18/06/2016.
 */
myApp.controller('profileController', ['$scope',
    'userService',
    '$window',
    '$rootScope',
    'SweetAlert',
    '$location',
    function ($scope, $userService, $window, $rootScope,SweetAlert,$location) {

        $scope.submit = update;
        $scope.updateform = {};

        function updateProfileForm(data) {
            $scope.updateform.name = data.name;
            $scope.updateform.city = data.city;
            $scope.updateform.state = data.state;
        }

        $userService.get().success(function(data){
            updateProfileForm(data);
            console.log(data);
        });

        function update() {
            $userService.put($scope.updateform).success(function(data){
                updateProfileForm(data);
                console.log(data)
            });
        }
}]);