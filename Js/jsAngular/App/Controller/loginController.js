app
  .controller('loginController', ['$scope', '$rootScope', '$routeParams', '$translate', 'CRUDGeneric', 'serviceLoadCbx', '$location', 'authService',  '$timeout',
    function ($scope, $rootScope, $routeParams, $translate, CRUDGeneric, serviceLoadCbx, $location, authService,  $timeout) {
        $rootScope.IsAuthenticated = false;
        authService.logOut();

        $scope.InitObj = function () {
            $scope.ItemReset = {};

            $scope.ItemUser = {};
            $scope.ItemUser.Active = true;
            $scope.ItemUser.Locked = false;
            $scope.ItemUser.Approved = false;
            $scope.ItemUser.Complete = false;

            $scope.ItemUser.TypeUserID = parseInt($routeParams.TypeUser);
            $scope.ItemUser.TypeUserID = 1;

           

            $scope.loginData = {
                userName: "",
                userNameCC: "",
                userNameNit: "",
                password: "",
                useRefreshTokens: true
            };

            $scope.ItemReset.TipoUser = $scope.ItemUser.TypeUserID;
        };
        $scope.InitObj();

        $scope.ViewConfig = function (View) {


            if (View >= 2) {
                if ($scope.TypeIdentification === undefined || $scope.HelpFinally === undefined) {
                    serviceLoadCbx.getTypeIdentificationTypeUser(function (data) {
                        $scope.TypeIdentification = data;

                        if ($scope.ItemUser.TypeUserID === 1) {
                            $scope.ItemUser.TypeIdentificationID = 1;
                        } else {
                            $scope.ItemUser.TypeIdentificationID = 2;
                        }
                    }, $scope.ItemUser.TypeUserID);

                   

                    CRUDGeneric.getItem('TextHelp/GetTextHelp', 5).then(function (data) {
                        $scope.HelpFinally = data.data;
                    });
                }
            }

            $scope.Views = View;

            if (View == 2) {
                $timeout(function () { RenderCaptcha('Register_Captcha') }, 200);
            }
            if (View == 0) {
                $timeout(function () { RenderCaptcha('Remember_Captcha') }, 200);
            }
        };

        $scope.Login = function () {
            $scope.loginData.userName = $scope.loginData.userNameCC; 

            authService.login($scope.loginData).then(function (data) {
                if (data.data.approved.toLowerCase() === "true") { $rootScope.IsAuthenticated = true; $location.path('/Main'); }
                else { $location.path('/SignIn'); }
            });
        };

        $scope.RecordarPss = function () {
            CRUDGeneric.addItem('Account/RememberPassword', $scope.ItemReset)
              .then(function (data) {
                  if (data.data.CodeResponse !== undefined) {
                      if (data.data.CodeResponse === 200) {
                          $location.path('/')
                      }
                  }
              });
        };

        $scope.Register = function () {
            CRUDGeneric.addItem('User/SaveComplete', { User: $scope.ItemUser, UserNatural: $scope.ItemUser.UserNatural, UserAgency: $scope.ItemUser.ItemUserAgency, UserAgencyAdmon: $scope.ItemUser.ItemUserAgencyAdmon })
              .then(function (data) {
                  if (data.data.CodeResponse !== undefined) {
                      if (data.data.CodeResponse === 200) {
                          
                              $scope.loginData.userNameCC = $scope.ItemUser.Identification;
                              $scope.loginData.password = $scope.ItemUser.Password;
                          

                          $scope.Views = 3;
                      }
                  }
              });
        };

        $scope.ValidarDigitoNIT = function () {
            if ($scope.ItemUser.TypeUserID == 2) {
                if ($scope.ItemUser.Identification.length == 9) {
                    var Primos = [41, 37, 29, 23, 19, 17, 13, 7, 3];
                    var suma = 0;
                    for (var i = 0; i < $scope.ItemUser.Identification.length; i++) {
                        var Digito = parseInt($scope.ItemUser.Identification[i])
                        var primo = parseInt(Primos[i])
                        suma += (Digito * primo);
                    }
                    var digit = 11 - (suma % 11);
                    if (digit < 10) {
                        $scope.ItemUser.VerificationDigit = digit.toString()[0];
                    } else if (digit == 11) {
                        $scope.ItemUser.VerificationDigit = 0;
                    } else if (digit == 10) {
                        $scope.ItemUser.VerificationDigit = digit.toString()[0];
                    } else {
                        $scope.ItemUser.VerificationDigit = 'E';
                    }

                } else {
                    $scope.ItemUser.VerificationDigit = "";
                }
            }
        }

        $scope.Ingresar = function () {
            $scope.Login();

            $scope.InitObj();
        };

    }]);