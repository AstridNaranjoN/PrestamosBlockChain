app
  .controller('mainController', ['$scope', 'CRUDGeneric', '$location', '$filter', 'authService', 'Enumerations',
    function ($scope, CRUDGeneric, $location, $filter, authService, Enumerations) {
        $scope.viewPrint = false;
        $scope.viewShow = 0;
        $scope.FechasCertificado = {
            FechaFinal: new Date(),
            FechaInicial: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            maxInicial: new Date(),
            maxFinal: new Date(),
            minInicial: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            MinFinal: new Date(new Date().setMonth(new Date().getMonth() - 12)),
        };

        $scope.checkDateValidity = function () {
            $scope.FechasCertificado.minInicial = new Date(new Date($scope.FechasCertificado.FechaFinal).setMonth(new Date().getMonth() - 6));
        };

        $scope.generarCertificado = function () {
            var errores = "";
            if (!$scope.FechasCertificado.FechaFinal) {
                errores += (errores.length > 0) ? "<br>" : "" + "La fecha final es obligatoria y debe ser mayor a " + $filter('date')(new Date($scope.FechasCertificado.MinFinal), 'yyyy-MM-dd')
            }
            if (!$scope.FechasCertificado.FechaInicial) {
                errores += (errores.length > 0) ? "<br>" : "" + "La fecha inicial es obligatoria y no debe ser menor a 6 meses de la fecha final."
            }
            if (errores) {
                bootbox.alert(errores);
            } else {
                var fechaInicio = $filter('date')(new Date($scope.FechasCertificado.FechaInicial), 'yyyy-MM-dd');
                var fechaFin = $filter('date')(new Date($scope.FechasCertificado.FechaFinal), 'yyyy-MM-dd');
                CRUDGeneric.getItem('FormatsFisaPay/ValidarDatosCertificado/' + $scope.UserID + '/' + fechaInicio + '/' + fechaFin).then(function (data) {
                    if (data.ConDatos) {
                        CRUDGeneric.downloadFile('FormatsFisaPay/DownloadCertificado/' + $scope.UserID + '/' + fechaInicio + '/' + fechaFin);
                    } else {
                        bootbox.alert("No hay datos de comisiones en las fechas seleccionadas para generar el informe.")
                    }
                });
            }

        };

        $scope.ActivarVista = function (VistaID) {
            if (VistaID === 1) {
                $scope.InitUser();
            }
            if (VistaID === 3) {
                $location.path('/UploadDialy');
            }
            if (VistaID === 4) {
                $location.path('/MisPagos/' + $scope.UserID);
            }
            if (VistaID === 5) {
                $location.path('/AgencyBill/' + $scope.UserID);
            }
            $scope.viewShow = VistaID;
        };

        $scope.ValidarUsuario = function (Item) {
            if (Item.TypeUserID == 1) {
                $location.path('/ManageUserNatural/' + Item.UserNaturalID);
            } else if (Item.TypeUserID == 2) {
                $location.path('/ManageUserLegal/' + Item.UserLegalID);
            }
        };

        $scope.getHeader = function () { return ["No.", "ID Pel.", "Cust ID", "Meter SN", "Readingpoint", "Last Dial", "Status"]; };
        $scope.InitUser = function () {
            CRUDGeneric.getList('/User/ListUsers')
              .then(function (data) {
                  $scope.CountUserNatural = data.data.PersonaNatural.length;
                  $scope.UserPendientesA = $filter('filter')(data.data.PersonaNatural, { Complete: true, Approved: false });
                  $scope.UserPendientesC = $filter('filter')(data.data.PersonaNatural, { Complete: false });
                  $scope.UserActivos = $filter('filter')(data.data.PersonaNatural, { Complete: true, Approved: true });

                  $scope.CountUserJuridica = data.data.PersonaJuridica.length;
                  $scope.UserPendientesJuridicaA = $filter('filter')(data.data.PersonaJuridica, { Complete: true, Approved: false });
                  $scope.UserPendientesJuridicaC = $filter('filter')(data.data.PersonaJuridica, { Complete: false });
                  $scope.UserActivosJuridica = $filter('filter')(data.data.PersonaJuridica, { Complete: true, Approved: true });
              });
        };

        $scope.inicializarVistas = function () {
            authService.fillAuthData();
            $scope.UserID = authService.authentication.codeUser;
            $scope.UserProfile = authService.authentication.userProfile;
            $scope.TypeUserID = authService.authentication.User.TypeUserID;
            $scope.viewShow = 0;
        };

        $scope.VerVista = function (VistaID) {
            
            if ($scope.UserProfile === Enumerations.Profiles.Administrador) {
                return true;
            }
            switch (VistaID) {
                case 1: //'Usuarios'
                    if ($scope.UserProfile === Enumerations.Profiles.Administrador_FisaPay)
                        return true;
                    break;

                case 2: //  'Documentos'
                    if ($scope.UserProfile === Enumerations.Profiles.Vendedor)
                        return true;
                    break;

                case 3: //  'Cargue Diario'
                    if ($scope.UserProfile === Enumerations.Profiles.Usuario_Financiera)
                        return true;
                    break;
                case 4: //  'Mis Comisiones'
                    if ($scope.UserProfile === Enumerations.Profiles.Vendedor || $scope.UserProfile === Enumerations.Profiles.Usuario_Agencia)
                        return true;
                    break;

                case 5: //  'Cargar Facturas'
                    if ($scope.UserProfile === Enumerations.Profiles.Usuario_Agencia)
                        return true;
                    break;
                default:
                    return false;
            }

            return false;
        };

        (function () {
            $scope.inicializarVistas();
        })();
    }]);