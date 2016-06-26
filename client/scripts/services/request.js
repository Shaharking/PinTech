/**
 * Created by Shahar on 23/06/2016.
 */
myApp.factory('requestService', ['$http', '$window', function ($http, $window) {

	return {
		get: getRequest,
		post: createRequest,
		delete: deleteRequest,
		put: updateRequest
	};

	function getRequest(username) {
		var user = username || $window.sessionStorage.username;
		return $http.get('/api/requests/'+user);
	}

	function createRequest(data, username) {
		var user = username || $window.sessionStorage.username;
		return $http.post('/api/requests/'+user,data);
	}

	function deleteRequest(id, username) {
		var user = username || $window.sessionStorage.username;
		return $http.delete('/api/requests/'+user+'/'+id);
	}

	function updateRequest(id, data, username) {
		var user = username || $window.sessionStorage.username;
		return $http.put('/api/requests/'+user+'/'+id,data);
	}


}]);