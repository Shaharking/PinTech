/**
 * Created by Shahar on 26/03/2016.
 */

var myApp = angular.module('myApp', ['ngRoute','oitozero.ngSweetAlert']);

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
        when('/books',{
            templateUrl: '/client/scripts/views/book.html',
            controller : 'bookController'
        }).
        when('/browse',{
            templateUrl: '/client/scripts/views/browse.html',
            controller : 'browseController'
        }).
        when('/poll/watch/:username/:title',{
            templateUrl: '/client/scripts/views/poll.html',
            controller : 'pollController'
        }).
        when('/user/:username',{
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