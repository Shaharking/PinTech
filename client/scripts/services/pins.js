/**
 * Created by Shahar on 23/06/2016.
 */

myApp.factory('pinService', ['$http' ,'$window', function ($http, $window) {

	return {
		post : createPin,
		delete : deletePin,
		list : getPins,
		get: getMyPins
	};

	function getPins()	{
		return $http.get('/api/pins/');
	}

	function getMyPins(username){
		var user = username || $window.sessionStorage.username;
		return $http.get('/api/pins/'+user);
	}

	function createPin(data,username){
		return $http.post('/api/pins/',data);
	}

	function deletePin(id) {
		return $http.delete('/api/pins/'+id);
	}

}]);