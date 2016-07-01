myApp.controller('homeController', ['$scope', '$routeParams', 'SweetAlert', '$window' ,'pinService', function($scope, $routeParams, SweetAlert, $window, $pinService) {

    $scope.userid = $routeParams.id;
    $scope.pins = [];
    $scope.deletePin = deletePin;
    $scope.currentUser = $window.sessionStorage.userid;

    var service = $pinService.list;
    if($scope.userid){
        service = function(){
            return $pinService.get.call(this,$scope.userid);
        };
    }
    service().success(function(data){
        $scope.pins = data;
    });

    function deletePin(pin,index){
        $pinService.delete(pin._id).success(function(data){
            $scope.pins.splice(index,1);
        })
    }


}]);
/**
 * Created by Shahar on 26/03/2016.
 */
