app
  .controller("indexController", ['$scope', 'CRUDGeneric', '$location', 'authService', '$interval',
function ($scope, CRUDGeneric, $location, authService, $interval) {
    $scope.Menu = [];
    $scope.User = {};
    $scope.Messages = {};
    $scope.CheckedAll = false;

    $scope.CargarMenu = function () {
        // CRUDGeneric.getList('UserPermissions/getMenu')
        //   .then(function (data) {
        //       $scope.Menu = data.data.Response;
        //   });
    };
    $scope.CerrarSesion = function () {
        authService.logOut();
        $location.path("/");
    };
    // $scope.getURL = function (obj) {

    //     return '#!/' + obj.View + SetParameters(obj.Parameters);
    // }
    // $scope.SetParameters = function (Parameters) {
    //     var parametersReturn = Parameters;
    //     if (Parameters && Parameters.length > 0) {
    //         var tags = ["{{ConcesionarioID}}", "{{UserID}}"]
    //         for (var i = 0; i < tags.length; i++) {
    //             var tag
    //             switch (tags[i]) {
    //                 case "{{ConcesionarioID}}":
    //                     parametersReturn = parametersReturn.replace(tags[i], $scope.User.UserID);
    //                     $scope.User
    //                     break;
    //                 case "{{UserID}}":
    //                     parametersReturn = parametersReturn.replace(tags[i], $scope.User.UserID);
    //                     break;

    //                 default:
    //                     break;
    //             }
    //         }
    //     }
    //     return parametersReturn
    // }
    // $scope.OpenMessages = function () {
    //     CRUDGeneric.getItem('UserMessages/GetList/' + $scope.User.TypeUserID + '/' + $scope.User.UserID).then(function (data) {
    //         $scope.Messages.lstMessages = data.data !== null ? data.data : {};
    //         $scope.Messages.Count = $scope.Messages.lstMessages.length;
    //     });

    // };
    // $scope.CheckAll = function () {
    //     $scope.CheckedAll = !$scope.CheckedAll;
    //     for (var i = 0; i < $scope.Messages.lstMessages.length; i++) {
    //         $scope.Messages.lstMessages[i].Checked = $scope.CheckedAll;
    //     }
    // };

    // $scope.DeleteMessages = function () {
    //     var UserMessagesID = [];
    //     for (var i = 0; i < $scope.Messages.lstMessages.length; i++) {
    //         if ($scope.Messages.lstMessages[i].Checked) {
    //             UserMessagesID.push($scope.Messages.lstMessages[i].UserMessagesID);
    //         }
    //     }

    //     CRUDGeneric.genericRequest('DELETE', 'UserMessages/DeleteMessages', UserMessagesID).then(function (data) {
    //         $scope.OpenMessages();
    //     });
    // };

    // $scope.GetCount = function () {
    //     if ($scope.User.UserID && $scope.User.UserID != 0) {
    //         if ($scope.User.TypeUserID == 6) {
    //             CRUDGeneric.getItem('UserMessages/GetCount/' + $scope.User.TypeUserID + '/' + $scope.User.UserID).then(function (data) {
    //                 $scope.Messages.Count = data.data;
    //             })
    //         }
    //     }
    // };

    // $scope.CrearConsultaIntervalo = function () {
    //     $scope.GetCount();
    //     $interval(function () {
    //         $scope.GetCount();
    //     }, 300000);
    // };


    //initialize 
    (function () {

        authService.fillAuthData();
        $scope.User = authService.authentication.User;

        $scope.CargarMenu();
        // $scope.CrearConsultaIntervalo();
    })();
}]);