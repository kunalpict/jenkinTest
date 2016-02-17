(function() {

  angular
    .module('recipes')
    .controller('RecipesController', [
      '$scope', 'recipesService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$mdDialog', '$mdMedia',
      function($scope, recipesService, $mdSidenav, $mdBottomSheet, $log, $q, $mdDialog, $mdMedia) {
        var self = this;

        self.selected = null;
        self.users = [];
        self.selectUser = selectUser;
        self.toggleList = toggleUsersList;
        self.showContactOptions = showContactOptions;

        self.toggleRight = function() {
          $mdSidenav('right')
            .toggle()
            .then(function() {
              $log.debug("toggle " + navID + " is done");
            });
        };

        // Load all registered users

        recipesService
          .loadAllUsers()
          .then(function(users) {
            self.users = [].concat(users.data);
            self.selected = users[0];
          });

        // *********************************
        // Internal methods
        // *********************************

        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
          var pending = $mdBottomSheet.hide() || $q.when(true);

          pending.then(function() {
            $mdSidenav('left').toggle();
          });
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser(user) {
          self.selected = angular.isNumber(user) ? $scope.users[user] : user;
          self.toggleList();
        }

        /**
         * Show the bottom sheet
         */
        function showContactOptions($event) {
          var user = self.selected;

          return $mdBottomSheet.show({
            parent: angular.element(document.getElementById('content')),
            templateUrl: './src/users/view/contactSheet.html',
            controller: ['$mdBottomSheet', ContactPanelController],
            controllerAs: "cp",
            bindToController: true,
            targetEvent: $event
          }).then(function(clickedItem) {
            clickedItem && $log.debug(clickedItem.name + ' clicked!');
          });

          /**
           * Bottom Sheet controller for the Avatar Actions
           */
          function ContactPanelController($mdBottomSheet) {
            this.user = user;
            this.actions = [
              { name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg' },
              { name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg' },
              { name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg' },
              { name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg' }
            ];
            this.submitContact = function(action) {
              $mdBottomSheet.hide(action);
            };
          }


        }

      }
    ]);

})();
