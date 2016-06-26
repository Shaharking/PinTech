/**
 * Created by Shahar on 28/03/2016.
 */

myApp.factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', function ($rootScope, $q, $window, $location) {

    return {
        request:handleRequests,
        response:handleResponse
    };

    function handleRequests(config){
        config.headers = config.headers || {};
        if($window.sessionStorage.token){
            config.headers["x-access-token"] = $window.sessionStorage.token;
        }
        return config;
    }

    function handleResponse(response){
        if(response.status === 401){
            //ToDo display box to show that he needs to login
            $location.path('/signin');
        }
        return response || $q.when(response);
    }
}]);