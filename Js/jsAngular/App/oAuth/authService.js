'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'apiServiceSettings',
  function ($http, $q, localStorageService, apiServiceSettings) {
    var serviceBase = apiServiceSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
      isAuth: false,
      userName: "",
      codeUser: 0,
      nameUser: "",
      userProfile: 0,
      useRefreshTokens: false
    };

    var _externalAuthData = {
      provider: "",
      userName: "",
      externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

      _logOut();

      return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
        return response;
      });

    };

    var _login = function (loginData) {

      var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

      if (loginData.useRefreshTokens) {
        data = data + "&client_id=" + apiServiceSettings.clientID;
      }

      var deferred = $q.defer();

      $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
        var dataAuthorization = {
          token: response.data.access_token,
          userName: response.data.userName,

          NameUser: response.data.user,
          codeUser: parseInt(response.data.codeuser),
          userRole: parseInt(response.data.userRole),
          refreshToken: "",
          useRefreshTokens: loginData.useRefreshTokens,
          User: {}
        };

        if (loginData.useRefreshTokens) { dataAuthorization.refreshToken = response.data.refresh_token; }
        localStorageService.set('authorizationData', dataAuthorization);

        _authentication.isAuth = true;
        _authentication.userName = dataAuthorization.userName;

        _authentication.codeUser = dataAuthorization.codeUser;
        _authentication.nameUser = dataAuthorization.NameUser;
        _authentication.userProfile = dataAuthorization.userRole;
        _authentication.useRefreshTokens = dataAuthorization.useRefreshTokens;

        $http.get(serviceBase + 'User/GetUserSesion').then(function (data) {
          if (data.data !== null) {
            var authData = localStorageService.get('authorizationData');
            authData.User = data.data;
            localStorageService.set('authorizationData', authData);

            deferred.resolve(response);
          }

          deferred.reject(err);
        }, function (err, status) {
          _logOut();
          deferred.reject(err);
        });

      }, function (err, status) {
        _logOut();
        deferred.reject(err);
      });

      return deferred.promise;

    };

    var _logOut = function () {

      localStorageService.remove('authorizationData');

      var _authentication = {
        isAuth: false,
        userName: "",
        codeUser: 0,
        nameUser: "",
        userProfile: 0,
        useRefreshTokens: false
      };

    };

    var _fillAuthData = function () {

      // var authData = localStorageService.get('authorizationData');
      var authData = { userName: "anaranjon@gmail.com", codeUser: "anaranjon", NameUser: "Astrid Naranjo", userRole: 1, useRefreshTokens: false, User: { FisrtName: "Astrid" } };
      if (authData) {
        _authentication.isAuth = true;
        _authentication.userName = authData.userName;

        _authentication.codeUser = authData.codeUser;
        _authentication.nameUser = authData.NameUser;
        _authentication.userProfile = authData.userRole;
        _authentication.useRefreshTokens = authData.useRefreshTokens;
        _authentication.User = authData.User;
      }

    };

    var _refreshToken = function () {
      var deferred = $q.defer();

      var authData = localStorageService.get('authorizationData');

      if (authData) {

        if (authData.useRefreshTokens) {

          var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + apiServiceSettings.clientID;

          localStorageService.remove('authorizationData');

          $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

            deferred.resolve(response);

          }, function (err, status) {
            _logOut();
            deferred.reject(err);
          });
        }
      }

      return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

      var deferred = $q.defer();

      $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

        _authentication.isAuth = true;
        _authentication.userName = response.userName;
        _authentication.useRefreshTokens = false;

        deferred.resolve(response);

      }).error(function (err, status) {
        _logOut();
        deferred.reject(err);
      });

      return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

      var deferred = $q.defer();

      $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

        _authentication.isAuth = true;
        _authentication.userName = response.userName;
        _authentication.useRefreshTokens = false;

        deferred.resolve(response);

      }).error(function (err, status) {
        _logOut();
        deferred.reject(err);
      });

      return deferred.promise;

    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
  }]);