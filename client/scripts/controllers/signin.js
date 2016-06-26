/**
 * Created by Shahar on 26/03/2016.
 */
myApp.controller('signInController', ['$scope', 'userService', '$window','$rootScope','SweetAlert','$location', function ($scope, $userService, $window, $rootScope,SweetAlert,$location) {

    $scope.submit = login;

    function login() {
        var user = $scope.form;
        var d = new Date();
        $userService.login(user)
            .success(function (data, status, headers, config) {
                d.setDate(d.getDate() + 1)
                $window.sessionStorage.token = data.token;
                $window.sessionStorage.username = data.username;
                $window.sessionStorage.timestap = d;
                $rootScope.$broadcast("user:logged-in");
                $location.path('/');
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
                // Handle login errors here
                SweetAlert.swal(
                    {
                        title:"Error!",
                        text : "Invalid user or password",
                        type : "error"
                    }
                );
                console.log('Error: Invalid user or password');
            });
    }

}]);