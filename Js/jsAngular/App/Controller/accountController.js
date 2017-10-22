app
  .controller('accountController', ['$scope', '$routeParams', 'CRUDGeneric', 'authService', '$location',
    function ($scope, $routeParams, CRUDGeneric, authService, $location) {
      $scope.parameterPage = {};
      $scope.MostarMensajeRepresentanteLegal = false;

      $scope.Init = function () {
        $scope.parameterPage.TypePage = parseInt($routeParams.TypePage);
        $scope.parameterPage.ID = $routeParams.ID;

        if ($scope.parameterPage.TypePage === 1) {
          CRUDGeneric.getItem('Account/ValidEmailUser', $scope.parameterPage.ID)
            .then(function (data) {
              if (data.data.CodeResponse !== undefined) {
                if (data.data.CodeResponse === 200) {
                  $scope.loginData = {
                    userName: data.data.Response.Identification,
                    password: data.data.Response.Password,
                    useRefreshTokens: true
                  };

                  if (data.data.Response.IdentificationConcesionario !== undefined) {
                    $scope.loginData.userName += '|' + data.data.Response.IdentificationConcesionario;
                  }

                  authService.login($scope.loginData).then(function (data) {
                    if (data.data.approved.toLowerCase() === "true") { $rootScope.IsAuthenticated = true; $location.path('/Main'); }
                    else { $location.path('/SignIn'); }
                  });
                }
              }
            });
        } else if ($scope.parameterPage.TypePage === 2) {
          CRUDGeneric.getItem('Account/ValidEmailUserLegal', $scope.parameterPage.ID)
            .then(function (data) {
              if (data.data.CodeResponse !== undefined) {
                if (data.data.CodeResponse === 200) {
                    $scope.MostarMensajeRepresentanteLegal = true;

                }
              }
            });
        }
      };

      $scope.Init();
    }]);