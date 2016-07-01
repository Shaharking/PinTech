/**
 * Created by Shahar on 01/07/2016.
 */
myApp.controller('pinController', ['$scope', '$routeParams', 'SweetAlert', '$window' ,'pinService', function($scope, $routeParams, SweetAlert, $window, $pinService) {
	$scope.submit = create;

	function create() {
		$pinService.post($scope.form).success(function(data){
			SweetAlert.swal(
				{title:"Success!", text : "Created successfully", type : "success"}
			);
			$scope.form = {};
		});
	}
}]);