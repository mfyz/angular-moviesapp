moviesApp.controller('SearchController', ['$scope', '$location', function($scope, $location){
	$scope.formSearchMovies = function(){
		$location.url('/search/' + $scope.formMovieTitle);
	}
}]);

moviesApp.controller('SearchResultsController', ['$scope', '$routeParams', 'moviesApi', '$location', function($scope, $params, moviesApi, $location){
	$scope.pageRendered = function() {
		$scope.renderFinished = 'content-loaded';
	};

	moviesApi.get('/', {
		s: $params.query
	}, function(results){
		$scope.searchResults = results;
		$scope.pageRendered();
	});

	$scope.goToSearch = function(){
		$location.url('/search');
	};

	$scope.getMovieDetail = function(movieId){
		$location.url('/movie/' + movieId);
	}
}]);

moviesApp.controller('MovieDetailsController', ['$scope', '$routeParams', '$resource', 'moviesApi', '$location', function($scope, $params, $resource, moviesApi, $location){
	$scope.pageRendered = function() {
		$scope.renderFinished = 'content-loaded';
	};

	moviesApi.get('/', {
		i: $params.movieId
	}, function(result){
		$scope.movieDetails = result;
		$scope.pageRendered();
	});

	$scope.goToSearch = function(){
		$location.url('/search');
	}
}]);
