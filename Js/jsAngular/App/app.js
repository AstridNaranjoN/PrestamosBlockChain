'use strict';

var app = angular
  .module('App-FISAPAY', [
    'pascalprecht.translate',
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCookies',
    'angular-loading-bar',
    'loadingMsgDirective',
    'ngCsv',
    'summernote',
    'ngPrint',
    'LocalStorageModule',
    'ui.select2'
  ])
  .run(['$rootScope', 'authService', '$location', function ($rootScope, authService, $location) {
    $rootScope.lang = 'es';
    $rootScope.theme = 'bootstrap';
    $rootScope.cssTable = 'table table-striped table-condensed table-bordered table-hover';
    $rootScope.cssForm = 'container row main main-form main-center';

    authService.fillAuthData();
    $rootScope.IsAuthenticated = authService.authentication.isAuth;

    var nPage = $location.path().indexOf("Account");
    if (nPage < 0) { nPage = $location.path().indexOf("Login"); }
    if (nPage < 0) {
      if (!$rootScope.IsAuthenticated)
        $location.path("/");
    }
  }]);