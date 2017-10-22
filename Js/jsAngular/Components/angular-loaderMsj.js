angular.module('loadingMsgDirective', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $rootScope) {
            return {
                'request': function (config) {
                    $rootScope.$broadcast('REQUEST_START');
                    return config;
                },
                'response': function (response) {
                    $rootScope.$broadcast('REQUEST_END');
                    return response;
                },
                'responseError': function (rejection) {
                    $rootScope.$broadcast('REQUEST_END');
                    return $q.reject(rejection);
                }
            };
        });
    }])
    .directive('loadingMsg', [function () {
        return {
            template: '<div ng-show="pending"><div class="blockPage"></div><div class="blockPageMsg"><img src="Images/loading.gif" style="width: 25%;"/><h1 translate="textCargando"></h1></div></div>',
            scope: {},
            link: function (scope, element, attrs) {
                scope.pending = 0;

                scope.$on('REQUEST_START', function () {
                    scope.pending += 1;
                    $('#dvContenido').hide();
                });

                scope.$on('REQUEST_END', function () {
                    scope.pending -= 1;
                    $('#dvContenido').show(200);
                });
            }
        };
    }]);