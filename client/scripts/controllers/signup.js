/**
 * Created by Shahar on 28/03/2016.
 */
myApp.controller('signUpController', ['$scope', 'userService','SweetAlert','$location', function ($scope, $userService,SweetAlert,$location) {

    $scope.submit = register;

    function register(){
        var user =  $scope.form;
        $userService.post(user)
            .success(function (data, status, headers, config) {
                SweetAlert.swal(
                    {
                        title:"Good job!",
                        text : data.message,
                        type : "success",
                        closeOnConfirm: true
                    },
                    function () {
                        $location.path('/signin');
                    });

            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                SweetAlert.swal(
                    {
                        title:"Error!",
                        text : data.message,
                        type : "error"
                    }
                );
                console.log(data.message);
            });
    }
}]);