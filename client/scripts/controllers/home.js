/**
 * Created by Shahar on 26/03/2016.
 */
myApp.controller('homeController', ['$scope', '$routeParams', 'SweetAlert', '$window', function($scope, $routeParams, SweetAlert, $window) {

    angular.element(document).ready(function() {

        $scope.username = $routeParams.username;

        $scope.myConnectedUsername = $window.sessionStorage.username;


    });

}]);