(function(){

function signInDialog() {

  var signIndirective = {
    restrict : "AE",
    template : "<md-button class=\"md-primary md-raised\" ng-click=\"signin.showAdvanced($event)\" flex=\"100\" flex-gt-md=\"auto\">login</md-button>",
    controller: signInDialogController,
    controllerAs: "signin"
  };

  return signIndirective;
}

function signInDialogController($scope,$mdDialog, $mdMedia) {

  this.showAdvanced = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'src/signin/signin.dialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }  

}

angular.module("signIn",['ngMaterial'])
  .directive("signinDialog", signInDialog);        

})(angular);