/**
 * Created by Shahar on 26/03/2016.
 */

var myApp = angular.module('myApp', ['ngRoute','oitozero.ngSweetAlert','ngMasonry']);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/client/scripts/views/home.html',
            controller: 'homeController'
        }).
        when('/register',{
            templateUrl: '/client/scripts/views/signup.html',
            controller : 'signUpController'
        }).
        when('/profile',{
            templateUrl: '/client/scripts/views/profile.html',
            controller : 'profileController'
        }).
        when('/signin',{
            templateUrl: '/client/scripts/views/signin.html',
            controller : 'signInController'
        }).
        when('/pin',{
            templateUrl: '/client/scripts/views/pin.create.html',
            controller : 'pinController'
        }).
        when('/user/:id',{
            templateUrl: '/client/scripts/views/home.html',
            controller: 'homeController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);


myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});