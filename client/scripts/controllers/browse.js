myApp.controller('browseController', ['$scope', 'bookService', 'userService' , '$q', 'requestService', function($scope, $bookService, $userService, $q, $requestService) {

	$scope.books = [];
	$scope.trade = trade;
	$scope.localtrade = chooseBook;
	$scope.Tradebooks = submit;
	$scope.isExchange = false;
	$scope.isTradeable = false;

	var requstedBookObject;
	var requstedUserId;
	var exchangeObject;

	var promiseInit = [];
	promiseInit.push($bookService.list());
	promiseInit.push($userService.get());

	$q.all(promiseInit).then(function(data){
		var userId = data[1].data._id;
		var books = data[0].data;

		$scope.books = books.filter(function(book){
			return book.id !== userId;
		});
		$scope.mybooks = books.filter(function(book){
			return book.id === userId;
		});
	});

	function trade(booklist,book) {
		if(!requstedBookObject || requstedBookObject === book){

			var userId = booklist.id;
			var bookId = book._id;
			requstedBookObject = book;
			requstedUserId = userId;

			if(book.mark){
				book.mark = $scope.isExchange  = false;
			}
			else{
				book.mark = $scope.isExchange = true;
			}
		}
		else{
			console.log('somthing else marked')
		}

	}

	function chooseBook(booklist,book){
		if(!exchangeObject || exchangeObject === book){
			$scope.isTradeable = true;
			var userId = booklist.id;
			var bookId = book._id;
			exchangeObject = book;
			if(book.mark){
				book.mark = $scope.isTradeable = false;
			}
			else{
				book.mark = $scope.isTradeable = true;
			}
		}
	}

	function submit(){
		var data = {
			username: requstedUserId,
			userbook: requstedBookObject._id,
			initiatorbook: exchangeObject._id
		};
		$requestService.post(data).success(function(data){
			console.log(data);
		})

	}

}]);
/**
 * Created by Shahar on 23/06/2016.
 */
