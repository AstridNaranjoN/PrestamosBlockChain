app.controller('homeController', ['$scope', '$rootScope', 'CRUDGeneric', 'authService',
    function ($scope, $rootScope, CRUDGeneric, authService) {
      $rootScope.IsAuthenticated = false;
      authService.logOut();
    }]);