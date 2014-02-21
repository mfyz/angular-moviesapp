moviesApp = angular.module('MoviesApp', ['ngRoute', 'ngResource']);

moviesApp.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(true);
	//$locationProvider.hashPrefix('!');
}]);

moviesApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/search', {
			templateUrl: '/views/search.html',
			controller: 'SearchController'
		}).
		when('/search/:query', {
			templateUrl: '/views/search-results.html',
			controller: 'SearchResultsController'
		}).
		when('/movie/:movieId', {
			templateUrl: '/views/movie-details.html',
			controller: 'MovieDetailsController'
		}).
		otherwise({
			redirectTo: '/search'
		});
}]);