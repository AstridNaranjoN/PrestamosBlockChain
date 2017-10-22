app
.controller("ListUserController", ['$scope', 'CRUDGeneric', '$translate', 'serviceLoadCbx', '$location',
        function ($scope, CRUDGeneric, $translate, serviceLoadCbx, $location) {


            $scope.List = function () {
                CRUDGeneric.getList('/User/ListUsers')
                  .then(function (data) {
                      
                      $scope.PersonaNatural = data.data.PersonaNatural;
                      $scope.PersonaJuridica = data.data.PersonaJuridica;
                  });
            };

            $scope.ViewUser = function (Item) {
                if (Item.TypeUserID == 1) {
                    $location.path('/ManageUserNatural/' + Item.UserNaturalID);
                } else if (Item.TypeUserID == 2) {
                    $location.path('/ManageUserLegal/' + Item.UserLegalID);
                }
            };

            $scope.ViewReport = function (UserID) {
                $location.path('/MisPagos/' + UserID);
            };

            $scope.DeleteUser = function (UserID) {
                bootbox.confirm({
                    title: "Confirmación",
                    message: "Está seguro que desea eliminar el usuario?",
                    buttons: {
                        confirm: {
                            label: '<i class="fa fa-check"></i> Si',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: '<i class="fa fa-times"></i> No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            CRUDGeneric.deleteItem('/User/DeleteComplete', UserID)
                              .then(function (data) {
                                  if (data.data.CodeResponse !== undefined) {
                                      $scope.List();
                                  }
                              });
                        }
                    }
                });

            };

            $scope.ViewBill = function (UserLegalID) {
                $location.path('/AgencyBill/' + UserLegalID);

            };

            //initialize 
            (function () { $scope.List(); })();

        }])
.controller('UserDetailController', ['$scope', '$routeParams', '$translate', 'CRUDGeneric', 'serviceLoadCbx', '$filter', 'Enumerations',
    function ($scope, $routeParams, $translate, CRUDGeneric, serviceLoadCbx, $filter, Enumerations) {
        $scope.viewMode = true;
        $scope.Totales = {};
        $scope.Datos = [];
        $scope.getCssClass = function (StatusID) {
            /*
              0	Sin Procesar
              1	Provisionado
              2	Pagado
            */

            switch (StatusID) {
                case 2:
                    return 'label-primary';
                    break;
                default:
                    return 'label-warning'
            }
        };
        $scope.Descargar = function (UserFileXUserID) {
            CRUDGeneric.downloadFile('UserFileXUser/GetFileXUser/', UserFileXUserID)
        };
        $scope.List = function () {
            CRUDGeneric.getList('FormatExcelDlleCommission/GetInformeDlleVendedor/' + $scope.date.month + '/' + $scope.date.year + '/' + $scope.Url.CodeUser)
          .then(function (data) {
              
              $scope.Datos = data.data;
              $scope.SumarTotales();
          });
        };
        $scope.filterDate = function () {
            $scope.List();
        };

        $scope.SumarTotales = function () {

            $scope.MostrarTotal = false;
            var Totales = {
                Total: 0,
                Comision: 0,
                TotalPagadasSS: 0,
                ValorSeguridadSocial: 0,
            }

            if ($scope.Datos && $scope.Datos.length > 0) {
                $scope.MostrarTotal = true;

                for (var i = 0; i < $scope.Datos.length; i++) {
                    Totales.Total += 1;
                    Totales.Comision += $scope.Datos[i].Comision;
                    Totales.ValorSeguridadSocial += $scope.Datos[i].ValorSeguridadSocial;
                    if ($scope.Datos[i].PagadoSS) {
                        Totales.TotalPagadasSS += 1;
                    }
                }
            }
            $scope.Totales = Totales;
        };

        $scope.InitObj = function () {
            
            $scope.Url = {};
            $scope.Url.CodeUser = parseInt($routeParams.UserID);

            $scope.msgTexto = '';
            $translate('Type1').then(function (Resource) {
                $scope.msgTexto = Resource;
            });

            CRUDGeneric.getItem('User', $scope.Url.CodeUser).then(function (data) {
                $scope.ItemUser = data.data !== null ? data.data : {};
            });

            CRUDGeneric.getItem('UserNatural', $scope.Url.CodeUser).then(function (data) {
                $scope.ItemUserNatural = data.data !== null ? data.data : {};
            });

            CRUDGeneric.getItem('UserFileXUser/GetUserFileXUser', $scope.Url.CodeUser).then(function (data) {
                $scope.UserFileXUser = data.data !== null ? $filter('filter')(data.data, { UserFileID: Enumerations.UserFiles.DocumentoIdentidad }) : {};
            });
        };

        $scope.InitObj();
    }])
.controller("UserViewController", ['$scope', 'CRUDGeneric', '$location', '$filter',
  function ($scope, CRUDGeneric, $location, $filter) {
      $scope.Datos = {};
      $scope.Filtros = {};
      $scope.DatosFilter = {};
      $scope.List = function () {
          CRUDGeneric.getList('/User/ListUsersView')
            .then(function (data) {
                $scope.Datos = data.data.PersonaNatural;
                $scope.DatosFilter = data.data.PersonaNatural;
            });
      };

      $scope.FilterList = function () {
          var Datos = JSON.parse(JSON.stringify($scope.Datos));
          if ($scope.Filtros.Name && $scope.Filtros.Name.length > 0) {
              Datos = $filter('filter')(Datos, { Name: $scope.Filtros.Name });
          }
          if ($scope.Filtros.Identification && $scope.Filtros.Identification.length > 0) {
              Datos = $filter('filter')(Datos, { Identification: $scope.Filtros.Identification });
          }
          $scope.DatosFilter = Datos;
      };

      $scope.ViewUser = function (Item) {
          $location.path('/UserDetailView/' + Item.UserNaturalID);
      };

      //initialize 
      (function () { $scope.List(); })();

  }]);
