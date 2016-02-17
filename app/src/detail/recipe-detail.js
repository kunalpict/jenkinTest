(function(angular) {

  function recipeDetail() {
    var recipeDetail = {
      restrict: "E",
      templateUrl: "src/detail/recipe.detail.tpl.html"
    };

    return recipeDetail;
  }


  angular.module("recipe", [])
    .directive("recipeDetail", recipeDetail);
})(angular);
