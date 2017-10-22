'use strict';

app
    .config(['$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        }])
    .config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider
                .useStaticFilesLoader({
                    prefix: 'Translations/',
                    suffix: '.json'
                })
                .preferredLanguage('es')
                .useLocalStorage()
                .useMissingTranslationHandlerLog()
                .useSanitizeValueStrategy('sanitize');
        }])
    .config(['localStorageServiceProvider',
        function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('appFisaPay');
        }])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                //   .when('/', {
                //       templateUrl: 'Vws/PagesPublic/Home.html',
                //       controller: 'homeController'
                //   })
                .when('/', {
                    templateUrl: 'Vws/PagesPublic/Login.html',
                    controller: 'loginController'
                })
                .when('/Account/:TypePage/:ID', {
                    templateUrl: 'Vws/Account.html',
                    controller: 'accountController'
                })

                .when('/SignIn', {
                    templateUrl: 'Vws/PagesPublic/SignIn.html',
                    controller: 'signinController'
                })
                .when('/Main', {
                    templateUrl: 'Vws/Main.html',
                    controller: 'mainController'
                })
                .when('/UploadDialy', {
                    templateUrl: 'Vws/PagesSincro/DailyDataBank.html',
                    controller: 'dailydatabankController'
                })
                .when('/PlanillaNatural/:FormatExcelID', {
                    templateUrl: 'Vws/PagesSincro/PlanillasNatural.html',
                    controller: 'PlanillasNaturalController'
                })

                .when('/PlanillaNaturalEdit/:FormatExcelID', {
                    templateUrl: 'Vws/PagesSincro/PlanillasNaturalEdit.html',
                    controller: 'PlanillasNaturalEditController'
                })
                .when('/PlanillaJuridica/:FormatExcelID', {
                    templateUrl: 'Vws/PagesSincro/PlanillasJuridica.html',
                    controller: 'PlanillasJuridicaController'
                })
                .when('/PlanillaJuridicaEdit/:FormatExcelID', {
                    templateUrl: 'Vws/PagesSincro/PlanillasJuridicaEdit.html',
                    controller: 'PlanillasJuridicaEditController'
                })

                .when('/ManageUserNatural/:CodeUser', {
                    templateUrl: 'Vws/PagesAdmin/ManageUsersNatural.html',
                    controller: 'manageUsersNaturalController'
                })
                .when('/ManageUserLegal/:CodeUser', {
                    templateUrl: 'Vws/PagesAdmin/ManageUsersLegal.html',
                    controller: 'manageUsersLegalController'
                })
                .when('/ManageFormatExcel', {
                    templateUrl: 'Vws/PagesAdmin/ManageFormatExcel.html',
                    controller: 'manageformatexcelController'
                })
                .when('/InformeDlle/:TypeUser', {
                    templateUrl: 'Vws/PagesReport/InformeDetallado.html',
                    controller: 'informedetalladoController'
                })
                .when('/MisPagos/:UserID', {
                    templateUrl: 'Vws/PagesReport/InformeDlleUser.html',
                    controller: 'informedlleuserController'
                })
                .when('/FormatExcelAdmin', {
                    templateUrl: 'Vws/PagesAdmin/FormatExcel.html',
                    controller: 'FormatExcelAdmin'
                })
                .when('/FormatExcelDlleAdmin/:FormatExcelID', {
                    templateUrl: 'Vws/PagesAdmin/FormatExcelDlle.html',
                    controller: 'FormatExcelDlleAdmin'
                })
                .when('/UserView', {
                    templateUrl: 'Vws/PagesAdmin/UserView.html',
                    controller: 'UserViewController'
                })
                .when('/UserDetailView/:UserID', {
                    templateUrl: 'Vws/PagesAdmin/UserDetailView.html',
                    controller: 'UserDetailController'
                })
                .when('/ChangePasswd', {
                    templateUrl: 'Vws/PagesAdmin/ChangePasswd.html',
                    controller: 'CahngePasswdController'
                })
                .when('/Users', {
                    templateUrl: 'Vws/PagesAdmin/User.html',
                    controller: 'ListUserController'
                })
                // .when('/ValidarCertificado', {
                //     templateUrl: 'Vws/PagesPublic/ValidarCertificado.html',
                //     controller: 'ValidarCertificadoController'
                // })
                // .when('/EquivalentDocuments', {
                //     templateUrl: 'Vws/Pages/EquivalentDocuments.html',
                //     controller: 'EquivalentDocumentsAdminController'
                // })
                // .when('/AgencyBill/:ConcesionarioID', {
                //     templateUrl: 'Vws/Pages/AgencyBill.html',
                //     controller: 'AgencyBillAdminController'

                // }).when('/AgencyBillDetails/:ConcesionarioID', {
                //     templateUrl: 'Vws/Pages/AgencyBillDetails.html',
                //     controller: 'AgencyBillDetailsController'
                // })





                .when('/Action', {
                    templateUrl: 'Vws/Pages/Action.html',
                    controller: 'ActionController'
                })
                .when('/Application', {
                    templateUrl: 'Vws/Pages/Application.html',
                    controller: 'ApplicationController'
                })
                .when('/ARL', {
                    templateUrl: 'Vws/Pages/ARL.html',
                    controller: 'ARLController'
                })
                .when('/Bank', {
                    templateUrl: 'Vws/Pages/Bank.html',
                    controller: 'BankController'
                })
                .when('/Cesantias', {
                    templateUrl: 'Vws/Pages/Cesantias.html',
                    controller: 'CesantiasController'
                })
                .when('/City', {
                    templateUrl: 'Vws/Pages/City.html',
                    controller: 'CityController'
                })
                .when('/CivilStatus', {
                    templateUrl: 'Vws/Pages/CivilStatus.html',
                    controller: 'CivilStatusController'
                })
                .when('/Country', {
                    templateUrl: 'Vws/Pages/Country.html',
                    controller: 'CountryController'
                })
                .when('/Department', {
                    templateUrl: 'Vws/Pages/Department.html',
                    controller: 'DepartmentController'
                })
                .when('/EPS', {
                    templateUrl: 'Vws/Pages/EPS.html',
                    controller: 'EPSController'
                })
                .when('/FormatExcel', {
                    templateUrl: 'Vws/Pages/FormatExcel.html',
                    controller: 'FormatExcelController'
                })
                .when('/FormatExcelDlle', {
                    templateUrl: 'Vws/Pages/FormatExcelDlle.html',
                    controller: 'FormatExcelDlleController'
                })
                .when('/FormatExcelDlleUser', {
                    templateUrl: 'Vws/Pages/FormatExcelDlleUser.html',
                    controller: 'FormatExcelDlleUserController'
                })
                .when('/FormatsFisaPay', {
                    templateUrl: 'Vws/Pages/FormatsFisaPay.html',
                    controller: 'FormatsFisaPayController'
                })
                .when('/Gender', {
                    templateUrl: 'Vws/Pages/Gender.html',
                    controller: 'GenderController'
                })
                .when('/Messages', {
                    templateUrl: 'Vws/Pages/Messages.html',
                    controller: 'MessagesController'
                })
                .when('/Notification', {
                    templateUrl: 'Vws/Pages/Notification.html',
                    controller: 'NotificationController'
                })
                .when('/NotificationsPending', {
                    templateUrl: 'Vws/Pages/NotificationsPending.html',
                    controller: 'NotificationsPendingController'
                })
                .when('/Parameter', {
                    templateUrl: 'Vws/Pages/Parameter.html',
                    controller: 'ParameterController'
                })
                .when('/ParameterHTML', {
                    templateUrl: 'Vws/Pages/ParameterHTML.html',
                    controller: 'ParameterHTMLController'
                })
                .when('/Pension', {
                    templateUrl: 'Vws/Pages/Pension.html',
                    controller: 'PensionController'
                })
                .when('/Profile', {
                    templateUrl: 'Vws/Pages/Profile.html',
                    controller: 'ProfileController'
                })
                .when('/ProfileResourceAction', {
                    templateUrl: 'Vws/Pages/ProfileResourceAction.html',
                    controller: 'ProfileResourceActionController'
                })
                .when('/ProfileResourceMain', {
                    templateUrl: 'Vws/Pages/ProfileResourceMain.html',
                    controller: 'ProfileResourceMainController'
                })
                .when('/RefreshTokens', {
                    templateUrl: 'Vws/Pages/RefreshTokens.html',
                    controller: 'RefreshTokensController'
                })
                .when('/Regimen', {
                    templateUrl: 'Vws/Pages/Regimen.html',
                    controller: 'RegimenController'
                })
                .when('/Resource', {
                    templateUrl: 'Vws/Pages/Resource.html',
                    controller: 'ResourceController'
                })
                .when('/ResourceAction', {
                    templateUrl: 'Vws/Pages/ResourceAction.html',
                    controller: 'ResourceActionController'
                })
                .when('/ResourceMain', {
                    templateUrl: 'Vws/Pages/ResourceMain.html',
                    controller: 'ResourceMainController'
                })
                .when('/Services', {
                    templateUrl: 'Vws/Pages/Services.html',
                    controller: 'ServicesController'
                })
                .when('/TextHelp', {
                    templateUrl: 'Vws/Pages/TextHelp.html',
                    controller: 'TextHelpController'
                })
                .when('/TypeAccountBank', {
                    templateUrl: 'Vws/Pages/TypeAccountBank.html',
                    controller: 'TypeAccountBankController'
                })
                .when('/TypeIdentification', {
                    templateUrl: 'Vws/Pages/TypeIdentification.html',
                    controller: 'TypeIdentificationController'
                })
                .when('/TypeUser', {
                    templateUrl: 'Vws/Pages/TypeUser.html',
                    controller: 'TypeUserController'
                })
                .when('/UserAgency', {
                    templateUrl: 'Vws/Pages/UserAgency.html',
                    controller: 'UserAgencyController'
                })
                .when('/UserAgencyAdmon', {
                    templateUrl: 'Vws/Pages/UserAgencyAdmon.html',
                    controller: 'UserAgencyAdmonController'
                })
                .when('/UserFile', {
                    templateUrl: 'Vws/Pages/UserFile.html',
                    controller: 'UserFileController'
                })
                .when('/UserFileXUser', {
                    templateUrl: 'Vws/Pages/UserFileXUser.html',
                    controller: 'UserFileXUserController'
                })
                .when('/UserLegal', {
                    templateUrl: 'Vws/Pages/UserLegal.html',
                    controller: 'UserLegalController'
                })
                .when('/UserNatural', {
                    templateUrl: 'Vws/Pages/UserNatural.html',
                    controller: 'UserNaturalController'
                })
                .when('/ReportList', {
                    templateUrl: 'Vws/PagesAdmin/ReportList.html',
                    controller: 'ReportPlanillasController'
                })

                .otherwise({
                    redirectTo: '/Main'
                });
        }])
    .config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider
                .useStaticFilesLoader({
                    prefix: 'Translations/',
                    suffix: '.json'
                })
                .preferredLanguage('es')
                .useLocalStorage()
                .useMissingTranslationHandlerLog()
                .useSanitizeValueStrategy('sanitize');
        }]);