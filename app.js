angular.module('services', ['ngResource'])
	.factory("moviesApi", function ($resource) {
		var apiBaseUrl = 'http://www.omdbapi.com';

		function requestTransformer(data, headers){
			//console.log(data);
			//data.awesome = 'Yes';
			return data;
		}

		function responseTransformer(data, headers){
			if (typeof(data.Error) !== 'undefined') {
				alert(data.Error);
			}

			return data;
		}

		function getMethod(endpoint, params, callback) {
			params.callback = 'JSON_CALLBACK';
			$resource(apiBaseUrl + endpoint , params, {
				get: {
					method: 'JSONP',
					transformRequest: requestTransformer,
					transformResponse: responseTransformer
				}
			}).get(function(response){
				callback(response);
			});
		}

		function postMethod(endpoint, params, callback) {
			params.callback = 'JSON_CALLBACK';
			$resource(apiBaseUrl + endpoint , params, {
				post: {
					method: 'JSONP',
					transformRequest: requestTransformer,
					transformResponse: responseTransformer
				}
			}).post(function(response){
				callback(response);
			});
		}

		return {
			get: getMethod,
			post: postMethod
		};
	});

moviesApp = angular.module('MoviesApp', ['ngRoute', 'ngResource', 'services']);

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

