(function(){
  'use strict';

  angular.module('recipes')
         .service('recipesService', ['$http', RecipesService]);

  function RecipesService($http){
    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $http.get("data/api/recipes.json");
      }
    };
  }

})();