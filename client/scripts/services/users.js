/**
 * Created by Shahar on 28/03/2016.
 */
myApp.factory('userService',['$http', '$window', function($http,$window){

    return {
        post : registerNewUser,
        login : auth,
        get: getUserDetails,
        put: updateUser
    };

    function registerNewUser(data){
        return $http.post('/api/users',data);
    }

    function auth(data){
        return $http.post('/api/login',data);
    }

    function getUserDetails(username){
        var user = username || $window.sessionStorage.username;
        return $http.get('/api/users/'+user);
    }

    function updateUser(data,username){
        var user = username || $window.sessionStorage.username;
        return $http.put('/api/users/'+user,data);
    }

}]);