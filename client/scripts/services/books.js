/**
 * Created by Shahar on 23/06/2016.
 */
myApp.factory('bookService', ['$http' ,'$window', function ($http, $window) {

	return {
		post : createBook,
		delete : deleteBook,
		list : getBooks,
		get: getMyBooks
	};

	function getBooks()	{
		return $http.get('/api/books/');
	}

	function getMyBooks(username){
		var user = username || $window.sessionStorage.username;
		return $http.get('/api/books/'+user);
	}

	function createBook(data,username){
		var user = username || $window.sessionStorage.username;
		return $http.post('/api/books/'+user,data);
	}

	function deleteBook(id,username) {
		var user = username || $window.sessionStorage.username;
		return $http.delete('/api/books/'+user+'/'+id);
	}

}]);