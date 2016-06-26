/**
 * Created by Shahar on 23/06/2016.
 */
myApp.controller('bookController', ['$scope', 'bookService', 'requestService', function($scope, $bookService, $requestService) {

	$scope.user = {};
	$scope.requestFrom = [];
	$scope.requestByYou = [];
	$scope.books = [];
	$scope.submit = addBook;
	$scope.deleteBook = deleteBook;
	$scope.updateRequest = updateRequest;
	$scope.deleteRequest = deleteRequest;

	$bookService.get().success(function(data) {
		$scope.books = data;
	});

	function addBook(form){
		$bookService.post(form).success(function(data){
			$scope.books = data;
		});
	}

	function deleteBook(book){
		$bookService.delete(book._id).success(function(data){
			$scope.books = data;
		});
	}

	$requestService.get().success(function(data) {
		$scope.requestFrom = data.byUser;
		$scope.requestByYou = data.fromUser;
	});

	function updateRequest(request,status,id){
		$requestService.put(request.id,{
			status: status
		}).success(function (data) {
			$scope.requestFrom[id] = data;
		})
	}

	function deleteRequest(request,index){
		$requestService.delete(request.id).success(function(data){
			$scope.requestByYou.splice(index,1);
		});
	}

}]);