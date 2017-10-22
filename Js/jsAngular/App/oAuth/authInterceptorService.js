'use strict';
app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', '$translate',
  function ($q, $injector, $location, localStorageService, $translate) {
    var authInterceptorServiceFactory = {};

    var _request = function (config) {
      config.headers = config.headers || {};

      var authData = localStorageService.get('authorizationData');
      if (authData) {
        config.headers.Authorization = 'Bearer ' + authData.token;
      }

      return config;
    };

    var _responseError = function (rejection) {
      if (rejection.status === 401) {
        var authService = $injector.get('authService');
        var authData = localStorageService.get('authorizationData');

        if (authData && authData.useRefreshTokens) {
          authService.refreshToken();

          //$location.path('/refresh');
          return $q.reject(rejection);
        } else {
          authService.logOut();
          $location.path('/');
        }
      } else {
        if (rejection.data !== null) {
          if (rejection.data.error !== undefined) {
            $translate(rejection.data.error).then(function (Resource) {
              myAlert("warning", Resource);
            });
          } else {
            if (rejection.data.CodeResponse !== undefined) {
              $translate(rejection.data.CodeMensaje).then(function (Resource) {
                myAlert(rejection.data.TypeResponse, Resource);
              });
            }
          }
        }
      }

      return $q.reject(rejection);
    };

    var _response = function (response) {
      if (response.data !== null && response.data.CodeResponse !== undefined) {
        if (!(response.data.CodeResponse === 200 && response.data.CodeMensaje === "Ninguno")) {
          $translate(response.data.CodeMensaje).then(function (Resource) {
            myAlert(response.data.TypeResponse, Resource);
          });
        }
      }

      return response || $q.when(response);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.response = _response;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
  }]);