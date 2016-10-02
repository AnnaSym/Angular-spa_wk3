function() {
	'use strict';

	var app = angular.module('NarrowItDownApp', []);

	app.controller('NarrowItDownController', [
		'MenuSearchService',

		'$log',

		function(MenuSearchService, $log) {
			var narrowcontroller = this;

			this.searchTerm = '';

			this.Loading = false;

	

			this.fetchData = function(searchTerm) {
				narrowcontroller.Loading = true;

				if( !searchTerm.trim() ) {
					narrowcontroller.found = [];

					narrowcontroller.Loading = false;

					return;
				}

				MenuSearchService.getMatchedMenuItems(searchTerm).then(function(data) {
					narrowcontroller.found = data;
				}, function(error) {
					$log.error('Unable to fetch data: ', error);
				})

				['finally'](function() {
					narrowcontroller.Loading = false;
				});
			};


			this.removeItem = function(itemIndex) {
				Array.isArray(narrowcontroller.found) && narrowcontroller.found.splice(itemIndex, 1);
			};
		}
	]);

	app.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

	app.directive('foundItems', function() {
		return {
			restrict: 'E',

			scope: {
				found: '<',

				onRemove: '&'
			},

			templateUrl: 'found-items.html'
		};
	});

	app.factory('MenuSearchService', [
		'$http',

		'ApiBasePath',

		'$q',

		function($http, ApiBasePath, $q) {
			

			function filterResult(items, searchString) {
				var re = new RegExp(searchString, 'i');

				return items.filter(function(item) {
					return re.test(item.description);
				});
			}

			return {
			

				getMatchedMenuItems: function(searchTerm) {
					return $http.get(ApiBasePath + "/menu_items.json").then(function(response) {
						return filterResult(response.data.menu_items, searchTerm);
					}, function(error) {
						return $q.reject(error);
					});
				}
			};
		}
	]);
})();
