'use strict';

app
  .factory('ValidationGeneric', [
      function (){
          return {
              YearMonth: function (year, month, MensajesError) {
                  if (!year || year < 2016) {
                      if (MensajesError.length > 0) MensajesError += "<br>"
                      MensajesError += 'El año debe ser mayor a 2016'
                  }
                  if (!month || month == 0) {
                      if (MensajesError.length > 0) MensajesError += "<br>"
                      MensajesError += 'Debe seleccionar el mes';
                  }
                  if (MensajesError || MensajesError.length > 0) {
                      bootbox.alert(MensajesError);
                      return false;
                  }
                  return true;
              }
          }
          
      }])
  .factory('CRUDGeneric', ['$http', 'apiServiceSettings',
    function ($http, apiServiceSettings) {
        return {
            Init: function ($scope, CallBack, Controller) {
                $scope.Controller = Controller;
                $scope.viewMode = false;
                $scope.ModeView = false;

                $scope.OpenModal = function (item, Mode, view) {
                    if (CallBack !== undefined)
                        CallBack(item, true, Mode, view);

                    $scope.viewMode = view === undefined ? false : view;
                    $scope.editMode = Mode;
                };

                $scope.get = function (Item) {
                    $scope.OpenModal(Item, false, true);
                };

                $scope.showadd = function () {
                    $scope.OpenModal(null, false);
                };

                $scope.edit = function (Item) {
                    $scope.OpenModal(Item, true);
                };

                $scope.cancel = function () {
                    if (CallBack !== undefined)
                        CallBack(null, false);
                };

                $scope.ProcessResponse = function (data, CallBackResponse) {
                    if (data.data.CodeResponse !== undefined) {
                        if (data.data.CodeResponse === 200) {
                            if (CallBackResponse !== undefined)
                                CallBackResponse(data);

                            $scope.cancel();
                        }
                    }
                };
            },
            getList: function (Controller) {
                return $http.get(apiServiceSettings.apiServiceBaseUri + Controller + '/');
            },
            getItem: function (Controller, Id) {
                return $http.get(apiServiceSettings.apiServiceBaseUri + Controller + '/' + (Id === undefined ? '' : Id));
            },
            addItem: function (Controller, Obj) {
                return $http.post(apiServiceSettings.apiServiceBaseUri + Controller + '/', Obj);
            },
            deleteItem: function (Controller, Id) {
                return $http.delete(apiServiceSettings.apiServiceBaseUri + Controller + '/' + Id);
            },
            updateItem: function (Controller, Obj) {
                return $http.put(apiServiceSettings.apiServiceBaseUri + Controller, Obj);
            },
            genericRequest: function (method, Controller, Obj) {
                var req = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    url: apiServiceSettings.apiServiceBaseUri + Controller,
                    data: Obj
                };
                return $http(req);
            },
            uploadFile: function (Controller, Obj) {
                return $http.post(apiServiceSettings.apiServiceBaseUri + Controller + '/', Obj, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                });
            },
            getPopUpHTML: function (Controller, Id) {
                $http.get(apiServiceSettings.apiServiceBaseUri + Controller + '/' + (Id === undefined ? '' : Id))
                  .then(function (data) {
                      
                      var ventimp = window.open(' ', 'popimpr');

                      ventimp.document.write(data.data);
                      var script = '<script src="../Js/jsJQuery/jquery.min.js" type="text/javascript"></script>' +
                                   '<script type="text/javascript">' +
                                     '$(document).ready(function () { ' +
                                     'window.print();' +
                                     'setTimeout(function () { window.onmousemove = function () { window.close(); } }, 50);' +
                                     '});' +
                                  '</script>';
                      ventimp.document.write(script);
                      ventimp.document.close();
                  });
            },
            downloadFile: function (controller, Id) {
                var url = apiServiceSettings.apiServiceBaseUri + controller + (Id === undefined ? '' : Id);
                window.open(url, '_self', '');
            },
            addAgencyBill: function (controller, id, Obj) {
                return $http.post(apiServiceSettings.apiServiceBaseUri + Controller + '/',id, Obj, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                });
            }

        };
    }])
  .factory('serviceLoadCbx', ['CRUDGeneric',
    function (CRUDGeneric) {
        return {
            getDepartment: function (CallBack) {
                return CRUDGeneric.getList('Department/GetDepartment')
                  .then(function (data) { CallBack(data.data); });
            },
            getCountry: function (CallBack) {
                return CRUDGeneric.getList('Country/GetCountry')
                  .then(function (data) { CallBack(data.data); });
            },
            getUser: function (CallBack) {
                return CRUDGeneric.getList('User/GetUser')
                  .then(function (data) { CallBack(data.data); });
            },
            getBank: function (CallBack) {
                return CRUDGeneric.getList('Bank/GetBank')
                  .then(function (data) { CallBack(data.data); });
            },
            getFormatExcel: function (CallBack) {
                return CRUDGeneric.getList('FormatExcel/GetFormatExcel')
                  .then(function (data) { CallBack(data.data); });
            },
            getFormatExcelDlle: function (CallBack) {
                return CRUDGeneric.getList('FormatExcelDlle/GetFormatExcelDlle')
                  .then(function (data) { CallBack(data.data); });
            },
            getUserAgency: function (CallBack) {
                return CRUDGeneric.getList('UserAgency/GetUserAgency')
                  .then(function (data) { CallBack(data.data); });
            },
            getMessages: function (CallBack) {
                return CRUDGeneric.getList('Messages/GetMessages')
                  .then(function (data) { CallBack(data.data); });
            },
            getProfile: function (CallBack) {
                return CRUDGeneric.getList('Profile/GetProfile')
                  .then(function (data) { CallBack(data.data); });
            },
            getResourceAction: function (CallBack) {
                return CRUDGeneric.getList('ResourceAction/GetResourceAction')
                  .then(function (data) { CallBack(data.data); });
            },
            getResourceMain: function (CallBack) {
                return CRUDGeneric.getList('ResourceMain/GetResourceMain')
                  .then(function (data) { CallBack(data.data); });
            },
            getResource: function (CallBack) {
                return CRUDGeneric.getList('Resource/GetResource')
                  .then(function (data) { CallBack(data.data); });
            },
            getAction: function (CallBack) {
                return CRUDGeneric.getList('Action/GetAction')
                  .then(function (data) { CallBack(data.data); });
            },
            getTypeUser: function (CallBack) {
                return CRUDGeneric.getList('TypeUser/GetTypeUser')
                  .then(function (data) { CallBack(data.data); });
            },
            getTypeIdentification: function (CallBack) {
                return CRUDGeneric.getList('TypeIdentification/GetTypeIdentification')
                  .then(function (data) { CallBack(data.data); });
            },
            getCity: function (CallBack) {
                return CRUDGeneric.getList('City/GetCity')
                  .then(function (data) { CallBack(data.data); });
            },
            getTypeAccountBank: function (CallBack) {
                return CRUDGeneric.getList('TypeAccountBank/GetTypeAccountBank')
                  .then(function (data) { CallBack(data.data); });
            },
            getRegimen: function (CallBack) {
                return CRUDGeneric.getList('Regimen/GetRegimen')
                  .then(function (data) { CallBack(data.data); });
            },
            getUserLegal: function (CallBack) {
                return CRUDGeneric.getList('UserLegal/GetUserLegal')
                  .then(function (data) { CallBack(data.data); });
            },
            getUserFile: function (CallBack) {
                return CRUDGeneric.getList('UserFile/GetUserFile')
                  .then(function (data) { CallBack(data.data); });
            },
            getUserFilexTypeUser: function (CallBack, TypeUserID) {
                return CRUDGeneric.getList('UserFile/GetUserFile/' + TypeUserID)
                  .then(function (data) { CallBack(data.data); });
            },
            getGender: function (CallBack) {
                return CRUDGeneric.getList('Gender/GetGender')
                  .then(function (data) { CallBack(data.data); });
            },
            getCivilStatus: function (CallBack) {
                return CRUDGeneric.getList('CivilStatus/GetCivilStatus')
                  .then(function (data) { CallBack(data.data); });
            },
            getARL: function (CallBack) {
                return CRUDGeneric.getList('ARL/GetARL')
                  .then(function (data) { CallBack(data.data); });
            },
            getEPS: function (CallBack) {
                return CRUDGeneric.getList('EPS/GetEPS')
                  .then(function (data) { CallBack(data.data); });
            },
            getPension: function (CallBack) {
                return CRUDGeneric.getList('Pension/GetPension')
                  .then(function (data) { CallBack(data.data); });
            },
            getCesantias: function (CallBack) {
                return CRUDGeneric.getList('Cesantias/GetCesantias')
                  .then(function (data) { CallBack(data.data); });
            },
            getUserConcesionarios: function (CallBack) {
                return CRUDGeneric.getList('User/GetUserConcesionarios')
                  .then(function (data) { CallBack(data.data); });
            },
            getUserVendedores: function (CallBack) {
                return CRUDGeneric.getList('User/GetUserVendedores')
                  .then(function (data) { CallBack(data.data); });
            },
            getTypeIdentificationTypeUser: function (CallBack, TypeUser) {
                return CRUDGeneric.getList('TypeIdentification/GetTypeIdentification/' + TypeUser)
                  .then(function (data) { CallBack(data.data); });
            },
            getUserFileTypeUser: function (CallBack, TypeUser) {
                return CRUDGeneric.getList('UserFile/GetUserFile/' + TypeUser)
                  .then(function (data) { CallBack(data.data); });
            },
            getMonths: function (CallBack) {
                return CRUDGeneric.getList('Tools/GetMonths')
              .then(function (data) { CallBack(data.data); });
            },
            getUserAgency: function (CallBack, ConcesionarioID) {
                return CRUDGeneric.getList('UserAgency/ListUserAgency/' + ConcesionarioID)
                  .then(function (data) { CallBack(data.data); });
            },
            getBankDetails: function (CallBack, ConcesionarioID) {
                return CRUDGeneric.getList('Bank/GetBankAgencyBillDetails/' + ConcesionarioID)
                    .then(function (data) { CallBack(data.data); });
            }
        };
    }]);