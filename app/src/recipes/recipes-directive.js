(function(angular) {

  function recipesDirective() {
    var recipesDirective = {
      restrict: "E",
      templateUrl: "src/recipes/view/recipes.tpl.html",
      controller: "RecipesController",
      controllerAs: "recipes",
    };

    return recipesDirective;
  }

  angular.module("recipes")
    .directive("recipesLayout", recipesDirective);
})(angular);
