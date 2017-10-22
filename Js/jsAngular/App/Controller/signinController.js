app.controller('signinController', ['$scope', '$translate', 'CRUDGeneric', 'serviceLoadCbx', '$filter', 'authService', '$location', 'Enumerations',
  function ($scope, $translate, CRUDGeneric, serviceLoadCbx, $filter, authService, $location, Enumerations) {
      $scope.InitObj = function () {
          $scope.Url = {};
          $scope.msgTexto = '';

          authService.fillAuthData();
          $scope.ItemUser = authService.authentication.User;

          if ($scope.ItemUser !== null) {
              $scope.Url.TypeUser = $scope.ItemUser.TypeUserID;
              $scope.Url.CodeUser = $scope.ItemUser.UserID;

              $translate('Type' + $scope.Url.TypeUser).then(function (Resource) {
                  $scope.msgTexto = Resource;
              });

              if ($scope.Url.TypeUser === 1) {
                  serviceLoadCbx.getGender(function (data) { $scope.Gender = data; });
                  serviceLoadCbx.getCivilStatus(function (data) { $scope.CivilStatus = data; });
                  serviceLoadCbx.getARL(function (data) { $scope.ARL = data; });
                  serviceLoadCbx.getEPS(function (data) { $scope.EPS = data; });
                  serviceLoadCbx.getPension(function (data) { $scope.Pension = data; });
                  serviceLoadCbx.getCesantias(function (data) { $scope.Cesantias = data; });
                  serviceLoadCbx.getUserConcesionarios(function (data) { $scope.User = data; });

                  CRUDGeneric.getItem('UserNatural', $scope.Url.CodeUser).then(function (data) {
                      $scope.ItemUserNatural = data.data !== null ? data.data : {};
                      $scope.ItemUserNatural.UserNaturalID = $scope.Url.CodeUser;
                  });
              } else if ($scope.Url.TypeUser === 2) {
                  CRUDGeneric.getItem('UserLegal', $scope.Url.CodeUser).then(function (data) {
                      $scope.ItemUserLegal = data.data !== null ? data.data : {};
                      $scope.ItemUserLegal.UserLegalID = $scope.Url.CodeUser;

                      serviceLoadCbx.getTypeIdentificationTypeUser(function (data) {
                          $scope.TypeIdentification = data;
                          $scope.ItemUserLegal.TypeIdentificationID = 1;
                      }, 1);

                      if ($scope.ItemUserLegal.UserAgencyID !== 0) {
                          CRUDGeneric.getItem('UserAgency', $scope.ItemUserLegal.UserAgencyID).then(function (data) {
                              $scope.ItemUserAgency = data.data !== null ? data.data : {};
                              $scope.ItemUserAgency.UserID = $scope.ItemUserLegal.UserLegalID;
                          });
                      }
                  });
              }

              serviceLoadCbx.getUserFileTypeUser(function (data) { $scope.UserFile = data; }, $scope.Url.TypeUser);
              CRUDGeneric.getItem('UserFileXUser/GetUserFileXUser', $scope.Url.CodeUser).then(function (data) {
                  $scope.UserFileXUser = data.data !== null ? data.data : {};
              });
          }

          CRUDGeneric.getItem('TextHelp/GetTextHelp', 0).then(function (data) {
              $scope.HelpInfo = data.data;
          });

          CRUDGeneric.getItem('TextHelp/GetTextHelp', 1).then(function (data) {
              $scope.HelpArchivos = data.data;
          });

          CRUDGeneric.getItem('TextHelp/GetTextHelp', 2).then(function (data) {
              $scope.HelpFinally = data.data;
          });

          CRUDGeneric.getItem('TextHelp/GetTextHelp', 6).then(function (data) {
              $scope.HelpHome = data.data;
          });

          CRUDGeneric.getItem('TextHelp/GetTextHelp', 7).then(function (data) {
              $scope.HelpUser = data.data;
          });

          CRUDGeneric.getItem('TextHelp/GetTextHelp', 8).then(function (data) {
              $scope.HelpContrato = data.data;
          });
          serviceLoadCbx.getCity(function (data) {
              $scope.City = data;
          });
          serviceLoadCbx.getBank(function (data) { $scope.Bank = data; });
          serviceLoadCbx.getTypeAccountBank(function (data) { $scope.TypeAccountBank = data; });
          serviceLoadCbx.getRegimen(function (data) { $scope.Regimen = data; });
      };

      $scope.InitObj();

      $scope.FileLoad = function (IDUserFile) {
          return !(($filter('filter')($scope.UserFileXUser, { UserFileID: IDUserFile, Valid: true, Message: '' })).length > 0);
      };

      $scope.viewMessage = function (Text) {
          if (Text.trim().length === 0) {
              $translate('MsjVerificacion').then(function (Verificacion) {
                  bootbox.alert(Verificacion);
              });
          } else { bootbox.alert(Text); }
      };

      $scope.CompleteInfo = function (Item) { $scope.TabUser = Item; };

      $scope.CerrarSesion = function () {
          authService.logOut();
          $location.path("/");
      };

      $scope.generarContrato = function () {
          CRUDGeneric.downloadFile('FormatsFisaPay/DownloadContrato/' + $scope.ItemUser.UserID);
      };

      $scope.SubirContratoCorretaje = function () {
          var fd = new FormData();
          fd.append('file', $scope.Archivo);

          CRUDGeneric.uploadFile('UploadFiles/GuardarContratoCorretaje', fd)
            .then(function (data) {
                if (data.data.CodeResponse !== undefined) {
                    if (data.data.CodeResponse === 200) {
                        $scope.TabUser = 5;
                    }
                }
            });
      };

      $scope.ActualizarDatosUsuario = function () {
          CRUDGeneric.updateItem('User/Modify', $scope.ItemUser)
            .then(function (data) {
                if (data.data.CodeResponse !== undefined) {
                    if ($scope.Url.TypeUser === 1) { $scope.TabUser = 1; }
                    else {
                        $scope.ItemUserAgency.Active = true;
                        CRUDGeneric.updateItem('UserAgency', $scope.ItemUserAgency)
                          .then(function (data) {
                              if (data.data.CodeResponse !== undefined) {
                                  $scope.TabUser = 1;
                              }
                          });
                    }
                }
            });
      };

      $scope.RegisterUserNatural = function () {
          if ($scope.ItemUserNatural.$id !== null && $scope.ItemUserNatural.$id !== undefined) {
              CRUDGeneric.updateItem('UserNatural/Modify', $scope.ItemUserNatural)
                .then(function (data) {
                    if (data.data.CodeResponse !== undefined) {
                        $scope.TabUser = 2;
                    }
                });
          } else {
              CRUDGeneric.addItem('UserNatural', $scope.ItemUserNatural)
                .then(function (data) {
                    if (data.data.CodeResponse !== undefined) {
                        $scope.InitObj();
                        $scope.TabUser = 2;
                    }
                });
          }
      };

      $scope.RegisterUserLegal = function () {
          if ($scope.ItemUserLegal.$id !== null && $scope.ItemUserLegal.$id !== undefined) {
              CRUDGeneric.updateItem('UserLegal/Modify', $scope.ItemUserLegal)
                .then(function (data) {
                    if (data.data.CodeResponse !== undefined) {
                        $scope.TabUser = 2;
                    }
                });
          } else {
              CRUDGeneric.addItem('UserLegal', $scope.ItemUserLegal)
                .then(function (data) {
                    if (data.data.CodeResponse !== undefined) {
                        $scope.InitObj();
                        $scope.TabUser = 2;
                    }
                });
          }
      };

      $scope.SubirArchivo = function () {
          var fd = new FormData();

          var nArchivos = 0;
          for (var i = 0; i < $scope.UserFile.length; i++) {
              if ($scope.UserFile[i].Archivo !== null || $scope.UserFile[i].Archivo !== undefined) {
                  fd.append($scope.UserFile[i].Name + '-' + $scope.UserFile[i].UserFileID, $scope.UserFile[i].Archivo);

                  nArchivos++;
              }
          }

          if (nArchivos > 0) {
              CRUDGeneric.uploadFile('UploadFiles/UploadFilesUser', fd)
                .then(function (data) {
                    if (data.data.CodeResponse !== undefined) {
                        if ($scope.Url.TypeUser === 1) { $scope.TabUser = 3; }
                        else { $scope.TabUser = 5; }
                    }
                });
          }
          else
              $scope.TabUser = 3;
      };

      $scope.SolicitarDocumento = function (Item) {
          switch (Item.UserFileID) {
              case Enumerations.UserFiles.CertificadoCuentaBancaria:
                  if ($scope.ItemUser.BankID == 2)
                      return false;
                  break;
              case Enumerations.UserFiles.ContratoCorretage:
                  return false;
                  break;
          }
          return true;
      };
  }])
  .controller('CahngePasswdController', ['$scope', '$translate', 'CRUDGeneric', 'authService', '$location',
  function ($scope, $translate, CRUDGeneric, authService, $location, Enumerations) {

      $scope.Datos = {};

      $scope.PasswdCheck = function () {
          if ($scope.Datos.NewPassword.length > 0) {
              if ($scope.Datos.NewPassword == $scope.Datos.ConfimPassword) {
                  return true;
              }
          }
          return false;
      };

      $scope.ChangePasswd = function () {
          if ($scope.PasswdCheck()) {
              authService.fillAuthData();
              $scope.Datos.UserID = authService.authentication.codeUser;
              CRUDGeneric.updateItem('Account/ChangePassword', $scope.Datos)
                            .then(function (data) {
                                if (data.data.CodeResponse !== undefined) {
                                    if (data.data.CodeResponse === 200) {
                                        $location.path('/');
                                    }
                                }
                            });



          } else {
              bootbox.alert('La nueva contraseña y la confirmación no coinciden, por favor corrige el problema para continuar.');
          }
      };

  }]);