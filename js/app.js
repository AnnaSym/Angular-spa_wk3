(function () {
'use strict';

angular.module('MenuItemsApp', [])
.controller('MenuItemsController', MenuItemsController)
.service('MenuItemsService', MenuItemsService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


MenuItemsController.$inject = ['MenuItemsService'];
function MenuItemsController(MenuItemsService) {
  var menu = this;

  var promise = MenuItemsService.getMenuItems();

  promise.then(function (response) {
    menu.items = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });



}


MenuItemsService.$inject = ['$http', 'ApiBasePath']
function MenuItemsService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function (shortName,title, description) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
	  
    });

    return response;
  };
  };


//  service.getMenuForCategory = function (shortName) {
//    var response = $http({
//      method: "GET",
//      url: (ApiBasePath + "/menu_items.json"),
//      params: {
//	    title: menuTitle,
//        description: MenuDescription,
//		category: menuShortName,
//		
//      }
//    });
//
//    return response;
//  };
//
//}

})();