var app = angular.module('app' , ['ui.router','ui.bootstrap','chart.js'] );



app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider , $urlRouterProvider) {
	$urlRouterProvider.otherwise("home");

    $stateProvider.state('home', {
        controller: 'products',
        templateUrl: 'partials/home.html',
        url: '/home'
    }).state('add', {
        controller: 'addProducts',
        templateUrl: 'partials/add.html',
        url: '/add'
    }).state('cities', {
     	controller: 'stad',
     	templateUrl: 'partials/cities.html',
     	url: '/cities',
        resolve: {
            b : ["cities", function (cities){
                return cities.get();
            }]
        }
     });
}]);


app.run(["$rootScope", function($rootScope) {

	$rootScope.products = [{type: 'shirt',price: '1800', image: 'shirt.jpg'}];
	$rootScope.cities = [];

}]);

app.factory('cities' , ["$http", function($http) {
		var x = {name: 'OggeTown', population: 99999999999999999999 };
        var array = [];
	return {

		get : function() {
			return $http.get('http://cities.jonkri.se/0.0.0/cities').then(function(response){
                array.splice(0, array.length); // array = [] = fucked up databinding
				// TODO: for loop; response.data.items
                for (var i = 0; i < response.data.items.length; i++) {
                    array.push(response.data.items[i]);
                }
                return array;
			});
		},
		post : function() {
			$http.post('http://cities.jonkri.se/0.0.0/cities', x );
		},
        getArray: function () {
            return array;
        }
	}
}]);

app.controller('products' , ["$scope", function($scope) {

$scope.remove = function($index) {
		$scope.products.splice($index , 1);
	};

}]);

app.controller('addProducts' , ["$scope", function($scope) {
    $scope.page = "Produkter";
	$scope.add = function() {
		$scope.products.push($scope.p);
		$scope.p = {};
		console.log($scope.products);
	};

	

}]);

app.controller('stad', ["$scope", "cities", function($scope , cities) {

    $scope.page = "Städer";

    $scope.label = [];

    $scope.pop = [];

    $scope.cities = cities;

    $scope.cit = $scope.cities.getArray();

    console.log($scope.cit);
	

    for (var i = 0; i < $scope.cit.length; i++) {
        $scope.label.push($scope.cit[i].name);
        $scope.pop.push($scope.cit[i].population);
    };

    console.log($scope.pop);
    console.log($scope.label);

}]);

app.directive('product' , function() {
    return {
        replace: true,
        restrict: 'E',
        template: '<div class="productWrap">\n<img src="{{n.image}}">\n<p><strong>Type:</strong>{{n.type}}</p>\n<p><strong>Price:</strong>{{n.price}}</p>\n<button ng-click="remove($index)">REMOVE</button>\n</div>'
    };
});
