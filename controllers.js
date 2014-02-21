moviesApp.controller('SearchController', ['$scope', '$location', function($scope, $location){
	$scope.formSearchMovies = function(){
		$location.url('/search/' + $scope.formMovieTitle);
	}
}]);

moviesApp.controller('SearchResultsController', ['$scope', '$routeParams', '$resource', '$location', function($scope, $params, $resource, $location){
	$scope.pageRendered = function() {
		$scope.renderFinished = 'content-loaded';
	}

	$scope.searchMoviesApi = $resource('http://www.omdbapi.com/', {
		s: $params.query,
		callback: 'JSON_CALLBACK'
	}, {
		get: {method: 'JSONP'}
	});

	$scope.searchMoviesApi.get(function(results){
		if (typeof(results.Error) !== 'undefined') {
			$scope.errorMessage = results.Error;
		}
		else {
			$scope.searchResults = results;
			$scope.pageRendered();
		}
	});

	$scope.goToSearch = function(){
		$location.url('/search');
	}

	$scope.getMovieDetail = function(movieId){
		$location.url('/movie/' + movieId);
	}
}]);

moviesApp.controller('MovieDetailsController', ['$scope', '$routeParams', '$resource', '$location', function($scope, $params, $resource, $location){
	$scope.pageRendered = function() {
		$scope.renderFinished = 'content-loaded';
	}

	$scope.getMovieDetailApi = $resource('http://www.omdbapi.com/', {
		i: $params.movieId,
		callback: 'JSON_CALLBACK'
	}, {
		get: {method: 'JSONP'}
	});

	$scope.getMovieDetailApi.get(function(result){
		if (typeof(result.Error) !== 'undefined') {
			$scope.errorMessage = result.Error;
		}
		else {
			$scope.movieDetails = result;
			$scope.pageRendered();
		}
	});

	$scope.goToSearch = function(){
		$location.url('/search');
	}
}]);
