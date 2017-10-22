'use strict';

app
  .directive('tooltip', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $(element).hover(function () {
          $(element).tooltip({ html: true });
          $(element).tooltip('show');
        }, function () {
          $(element).tooltip('hide');
          $(element).tooltip('destroy');
        });
      }
    };
  })
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }])
  .directive('myState', function () {
    return {
      restrict: 'E',
      scope: {
        stateInfo: '=state'
      },
      template: '<i class="fa fa-2x" ng-class="((stateInfo)? \'fa-check-circle text-success\' : \'fa-times-circle text-danger\')"></i>'
    };
    }).directive('myState2', function () {
        return {
            restrict: 'E',
            scope: {
                stateInfo: '=state'
            },
            template: '<i class="fa fa-2x" ng-class="((stateInfo)==3 ||(stateInfo)==2 ? \'fa-check-circle text-success\' : \'fa-times-circle text-danger\')"></i>'
        };
    }).directive('myHelpText', function () {
    return {
      restrict: 'E',
      scope: {
        HelpTextInfo: '=helptext'
      },
      template: function (elem, attr) {
        return '<div ng-if="HelpTextInfo != null" class="bs-callout bs-callout-' + (attr.type || false ? attr.type : 'info') + '">'
          + '<h4>{{HelpTextInfo.Title}}</h4>'
          + '<p ng-bind-html="HelpTextInfo.Text"></p>'
          + '</div>';
      }
    };
  })
  .directive('modalHeader', function () {
    return {
      restrict: 'E',
      template: '<div class="modal-header">'
      + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>'
      + '<div ng-hide="viewMode">'
      + '<h4 class="modal-title" id="myModalLabel" ng-hide="editMode" translate="TitCrear"></h4>'
      + '<h4 class="modal-title" id="myModalLabel" ng-show="editMode" translate="TitModificar"></h4>'
      + '</div>'

      + '<h4 class="modal-title" id="myModalLabel" ng-show="viewMode" translate="TitVer"></h4>'
      + '</div>'
    };
  })
  .directive('modalFooter', function () {
    return {
      restrict: 'E',
      template: function (elem, attr) {
        return '<div class="modal-footer" ng-hide="viewMode">'
          + '<button type="button" data-ng-click="cancel()" class="btn btn-default" translate="btnCancelar"></button>'
          + '<button type="button" data-ng-click="add()" class="btn btn-primary" data-ng-hide="editMode" ng-disabled="frm' + attr.name + '.$invalid" translate="btnCrear"></button>'
          + '<button type="button" data-ng-click="update()" class="btn btn-primary" data-ng-show="editMode" ng-disabled="frm' + attr.name + '.$invalid" translate="btnModificar"></button>'
          + '</div>'

          + '<div class="modal-footer" ng-show="viewMode">'
          + '<button type="button" class="btn btn-default" data-dismiss="modal" translate="btnCerrar"></button>'
          + '<button type="button" data-ng-click="delete(Item' + attr.name + ')" class="btn btn-danger" translate="btnEliminar"></button>'
          + '</div>';
      }
    };
  })
  .directive('titlePag', function () {
    return {
      restrict: 'E',
      template: function (elem, attr) {
        return '<div class="bs-callout bs-callout-title">'
          + '<h4 translate="' + attr.title + '"></h4>'
          + '</div>';
      }
    };
  })
  .directive('textSinDatos', function () {
    return {
      restrict: 'E',
      scope: {
        countList: '=length'
      },
      template: '<div class="col-sm-12" ng-show="countList == 0" translate="SinDatos"></div>'
    };
  })
  .directive('buttonList', function () {
    return {
      restrict: 'E',
      template: '<div class="btn-group" role="group">'
      + '<button type="button" data-ng-click="get(Item)" class="btn btn-default" data-toggle="tooltip" data-placement="top" tooltip title="{{\'tooltipVer\' | translate}}" translate="btnlistVer"></button>'
      + '<button type="button" data-ng-click="edit(Item)" class="btn btn-primary" data-toggle="tooltip" data-placement="top" tooltip title="{{\'tooltipModificar\' | translate}}" translate="btnlistModificar"></button>'
      + '<button type="button" data-ng-click="delete(Item)" class="btn btn-danger" data-toggle="tooltip" data-placement="top" tooltip title="{{\'tooltipEliminar\' | translate}}" translate="btnlistEliminar"></button>'
      + '</div>'
    };
  })
  .directive('buttonAdd', function () {
    return {
      restrict: 'E',
      template: '<div class="col-sm-12" style="padding-bottom: 5px;">'
      + '<button type="button" data-ng-click="showadd()" class="btn btn-primary btn-circle pull-right" translate="btnNuevo"></button>'
      + '</div>'
    };
  })
  .directive('dateFilter', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: 'Vws/Template/DateFilter.html',
      scope: {
        method: "&",
        model: '=ngModel'
      },
      link: function (scope, element) {
        moment.locale($rootScope.lang);
        var $datepicker = $(element);
        var $time = null;

        function updateDisplay(cur_date, bInit) {
          $datepicker.find('.date-input').val(cur_date);

          var $datecontainer = $datepicker.find('.date-container');
          $datecontainer.find('.month > .text').text(cur_date.format('MMMM'));
          $datecontainer.find('.year > .text').text(cur_date.format('YYYY'));
          $datepicker.data('date', cur_date.format('YYYY/MM/DD'));

          if (bInit) { loadScope(cur_date); }
        }

        function loadObj(cur_date) {
          return {
            month: parseInt(cur_date.format('MM')),
            year: parseInt(cur_date.format('YYYY')),
            date: cur_date,
            dateFormat: cur_date.format('YYYY/MM/DD')
          };
        }

        function loadScope(cur_date) {
          if ($time !== null) { $timeout.cancel($time); $time = null; }
          $time = $timeout(function () {
            scope.$apply(function () {
              scope.model = loadObj(cur_date);
            });

            scope.method();
          }, 1000);
        }

        updateDisplay(moment(), true);

        $datepicker.on('click', '[data-toggle="datepicker"]', function (event) {
          event.preventDefault();

          var cur_date = moment($(this).closest('.date-picker').data('date'), "YYYY/MM/DD"),
            type = $(this).data('type') ? $(this).data('type') : "date",
            method = $(this).data('method') ? $(this).data('method') : "add",
            amt = $(this).data('amt') ? $(this).data('amt') : 1;

          if (method === "add") {
            var duration = moment.duration(1, type);
            cur_date = cur_date.add(duration);
          } else if (method === "subtract") {
            cur_date = cur_date.subtract(1, type);
          }

          loadScope(cur_date);
          updateDisplay(cur_date, false);
        });
      },
      replace: true
    };
  }])
  .directive('yearFilter', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
      return {
          restrict: 'E',
          require: 'ngModel',
          templateUrl: 'Vws/Template/YearFilter.html',
          scope: {
              method: "&",
              model: '=ngModel'
          },
          link: function (scope, element) {
              moment.locale($rootScope.lang);
              var $datepicker = $(element);
              var $time = null;

              function updateDisplay(cur_date, bInit) {
                  $datepicker.find('.date-input').val(cur_date);
                  var $datecontainer = $datepicker.find('.date-container');
                  $datecontainer.find('.year > .text').text(cur_date.format('YYYY'));
                  $datepicker.data('date', cur_date.format('YYYY/MM/DD'));

                  if (bInit) { loadScope(cur_date); }
              }

              function loadObj(cur_date) {
                  return {
                      year: parseInt(cur_date.format('YYYY')),
                      date: cur_date,
                      dateFormat: cur_date.format('YYYY/MM/DD')
                  };
              }

              function loadScope(cur_date) {
                  if ($time !== null) { $timeout.cancel($time); $time = null; }
                  $time = $timeout(function () {
                      scope.$apply(function () {
                          scope.model = loadObj(cur_date);
                      });

                      scope.method();
                  }, 1000);
              }

              updateDisplay(moment(), true);

              $datepicker.on('click', '[data-toggle="datepicker"]', function (event) {
                  event.preventDefault();

                  var cur_date = moment($(this).closest('.date-picker').data('date'), "YYYY/MM/DD"),
                    type = $(this).data('type') ? $(this).data('type') : "date",
                    method = $(this).data('method') ? $(this).data('method') : "add",
                    amt = $(this).data('amt') ? $(this).data('amt') : 1;

                  if (method === "add") {
                      var duration = moment.duration(1, type);
                      cur_date = cur_date.add(duration);
                  } else if (method === "subtract") {
                      cur_date = cur_date.subtract(1, type);
                  }

                  loadScope(cur_date);
                  updateDisplay(cur_date, false);
              });
          },
          replace: true
      };
  }])
  .directive('fieldtxtForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view'
      },
      template: function (elem, attr) {
        if (JSON.parse(attr.label || 'true')) {
            return '<div class="form-group">'
            + '<label for="txt' + attr.name + '" class="col-sm-3 control-label" translate="txt' + attr.name + '"></label>'
            + '<div class="col-sm-9" ng-hide="viewMode">'
            + (JSON.parse(attr.inputgroup || 'false') ? '<div class="input-group"><span class="input-group-addon">' + ((attr.icongroup || 'false') !== 'false' ? '<i class="' + attr.icongroup + '" aria-hidden="true"></i>' : attr.textgroup || 'false' !== 'false' ? attr.textgroup : '') + '</span>' : '')
                  + '<input ng-change="' + (attr.change || '') + '" id="txt' + attr.name + '" name="txt' + attr.name + '" type="' + (attr.type || 'text') + '" data-ng-model="model" class="form-control" placeholder="{{\'phd' + attr.name + '\' | translate | html}}" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + ' ng-maxlength="' + (attr.maxlength || '') +'"/>'
            + (JSON.parse(attr.inputgroup || 'false') ? '</div>' : '')
            + '</div>'

            + '<div class="col-sm-9 txtView" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        } else {
            return '<div class="form-group">'
            + '<div class="col-sm-12" ng-hide="viewMode">'
            + (JSON.parse(attr.inputgroup || 'false') ? '<div class="input-group"><span class="input-group-addon">' + ((attr.icongroup || 'false') !== 'false' ? '<i class="' + attr.icongroup + '" aria-hidden="true"></i>' : attr.textgroup || 'false' !== 'false' ? attr.textgroup : '') + '</span>' : '')
            + '<input ng-change="' + (attr.change || '') + '" id="txt' + attr.name + '" name="txt' + attr.name + '" type="' + (attr.type || 'text') + '" data-ng-model="model" class="form-control" placeholder="{{\'phd' + attr.name + '\' | translate | html}}" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + ' />'
            + (JSON.parse(attr.inputgroup || 'false') ? '</div>' : '')
            + '</div>'

            + '<div class="col-sm-12" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        }
      },
      replace: true
    };
  })
  .directive('fieldcbx2Form', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view',
        listItems: '=list'
      },
      template: function (elem, attr) {
        if (JSON.parse(attr.label || 'true')) {
          return '<div class="form-group">'
            + '<label for="cbx' + attr.name + '" class="col-sm-3 control-label" translate="cbx' + attr.name + '"></label>'
            + '<div class="col-sm-9" ng-hide="viewMode">'
            + '<select ui-select2 data-placeholder="{{ \'SelectItem\' | translate }}" id="cbx' + attr.name + '" name="cbx' + attr.name + '" data-ng-model="model" class="form-control" ng-options="item.' + attr.value + ' as item.' + attr.text + ' for item in listItems" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '>'
            + '</select>'
            + '</div>'

            + '<div class="col-sm-9 txtView" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        } else {
          return '<div class="form-group">'
            + '<div class="col-sm-12" ng-hide="viewMode">'
            + '<select ui-select2 data-placeholder="{{ \'SelectItem\' | translate }}" id="cbx' + attr.name + '" name="cbx' + attr.name + '" data-ng-model="model" class="form-control" ng-options="item.' + attr.value + ' as item.' + attr.text + ' for item in listItems" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '>'
            + '</select>'
            + '</div>'

            + '<div class="col-sm-12" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        }
      },
      replace: true
    };
  })
  .directive('fieldcbxForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view',
        listItems: '=list'
      },
      template: function (elem, attr) {
        if (JSON.parse(attr.label || 'true')) {
          return '<div class="form-group">'
            + '<label for="cbx' + attr.name + '" class="col-sm-3 control-label" translate="cbx' + attr.name + '"></label>'
            + '<div class="col-sm-9" ng-hide="viewMode">'
            + '<select id="cbx' + attr.name + '" name="cbx' + attr.name + '" data-ng-model="model" class="form-control" ng-options="item.' + attr.value + ' as item.' + attr.text + ' for item in listItems" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '>'
            + (JSON.parse(attr.optiondefault || 'true') ? '<option value="" translate="SelectItem"></option>' : '')
            + '</select>'
            + '</div>'

            + '<div class="col-sm-9 txtView" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        } else {
          return '<div class="form-group">'
            + '<div class="col-sm-12" ng-hide="viewMode">'
            + '<select id="cbx' + attr.name + '" name="cbx' + attr.name + '" data-ng-model="model" class="form-control" ng-options="item.' + attr.value + ' as item.' + attr.text + ' for item in listItems" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '>'
            + (JSON.parse(attr.optiondefault || 'true') ? '<option value="" translate="SelectItem"></option>' : '')
            + '</select>'
            + '</div>'

            + '<div class="col-sm-12" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        }
      },
      replace: true
    };
  })
  .directive('fieldchkForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view'
      },
      template: function (elem, attr) {
        return '<div class="form-group">'
          + '<label class="col-sm-3 control-label" translate="chk' + attr.name + '"></label>'
          + '<div class="col-sm-9" ng-show="!viewMode">'
          + '<div class="material-switch txtView">'
          + '<input id="chk' + attr.name + '" name="chk' + attr.name + '" type="checkbox" data-ng-model="model" ' + (attr.required || false ? 'required' : '') + ' />'
          + '<label for="chk' + attr.name + '" class="label-' + (attr.type || false ? attr.type : 'success') + '"></label>'
          + '</div>'
          + '</div>'

          + '<div class="col-sm-9 txtView" ng-show="viewMode">'
          + '<my-state state="model"></my-state>'
          + '</div>'
          + '</div>';
      },
      replace: true
    };
  })
  .directive('fieldchksnForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view'
      },
      template: function (elem, attr) {
        return '<div class="form-group">'
          + '<label class="col-sm-3 control-label" translate="chk' + attr.name + '"></label>'
          + '<div class="col-sm-9 onoffswitch" ng-show="!viewMode">'
          + '<input id="chk' + attr.name + '" name="chk' + attr.name + '" type="checkbox" class="onoffswitch-checkbox" data-ng-model="model" ' + (attr.required || false ? 'required' : '') + ' />'
          + '<label class="onoffswitch-label" for="chk' + attr.name + '">'
          + '<div class="onoffswitch-inner">'
          + '<div class="onoffswitch-active"><div class="onoffswitch-switch" translate="chkSi"></div></div>'
          + '<div class="onoffswitch-inactive"><div class="onoffswitch-switch" translate="chkNo"></div></div>'
          + '</div>'
          + '</label>'
          + '</div>'

          + '<div class="col-sm-9 txtView" ng-show="viewMode">'
          + '<my-state state="model"></my-state>'
          + '</div>'
          + '</div>';
      },
      replace: true
    };
  })
  .directive('fieldyesnoForm', function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                viewMode: '=view'
            },
            template: function (elem, attr) {
                return '<div class="switch-field">'
       + '<div class="switch-title col-sm-3 control-label" translate="chk' + attr.name + '"></div>'
          + '<div class="col-sm-9" ng-show="!viewMode">'
      + '<input type="radio"  id="chk' + attr.name + '_left" name="chk' + attr.name + '" value="true" data-ng-model="model"/>'
      + '<label for="chk' + attr.name + '_left" translate="chkSi"></label>'
      + '<input type="radio" id="chk' + attr.name + '_right" name="chk' + attr.name + '" value="false" data-ng-model="model" />'
      + '<label for="chk' + attr.name + '_right" translate="chkNo"></label>'
    + '</div>'
    + '</div>'
	
    
            },
            replace: true
        };
    })
  .directive('fieldcodeForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view'
      },
      template: function (elem, attr) {
        return '<div class="form-group" ng-show="viewMode">'
          + '<label class="col-sm-3 control-label" translate="cd' + attr.name + '"></label>'
          + '<div class="col-sm-9 txtView">'
          + '<p>{{model | numberFixedLen:5}}</p>'
          + '</div>'
          + '</div>';
      },
      replace: true
    };
  })
  .directive('fieldfileForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel'
      },
      template: function (elem, attr) {
        return '<div class="input-group">'
          + '<input id="uploadFile" type="text" class="form-control txtUpload" placeholder="{{\'phlFileUpload\' | translate}}" disabled="disabled" />'
          + '<div class="fileUpload btn btn-primary input-group-btn">'
          + '<span translate="fileUpload"></span>'
          + '<input type="file" file-model="model" class="upload" onchange="return ValExtPermitidas(this);" required />'
          + '</div>'
          + '</div>';
      },
      replace: true
    };
  })
  .directive('fieldtxtarForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view'
      },
      template: function (elem, attr) {
        if (JSON.parse(attr.label || 'true')) {
          return '<div class="form-group">'
            + '<label for="txtar' + attr.name + '" class="col-sm-3 control-label" translate="txt' + attr.name + '"></label>'
            + '<div class="col-sm-9" ng-hide="viewMode">'
            + '<textarea id="txtar' + attr.name + '" name="txtar' + attr.name + '" data-ng-model="model" class="form-control" placeholder="{{\'phd' + attr.name + '\' | translate | html}}" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '></textarea>'
            + '</div>'

            + '<div class="col-sm-9 txtView" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        } else {
          return '<div class="form-group">'
            + '<div class="col-sm-12" ng-hide="viewMode">'
            + '<textarea id="txtar' + attr.name + '" name="txtar' + attr.name + '" data-ng-model="model" class="form-control" placeholder="{{\'phd' + attr.name + '\' | translate | html}}" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '></textarea>'
            + '</div>'

            + '<div class="col-sm-12" ng-show="viewMode">'
            + '<p> {{model}}</p>'
            + '</div>'
            + '</div>';
        }
      },
      replace: true
    };
  })
  .directive('fieldsmnForm', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        model: '=ngModel',
        viewMode: '=view'
      },
      template: function (elem, attr) {
        if (JSON.parse(attr.label || 'true')) {
          return '<div class="form-group">'
            + '<label for="smn' + attr.name + '" class="col-sm-3 control-label" translate="txt' + attr.name + '"></label>'
            + '<div class="col-sm-9" ng-hide="viewMode">'
            + '<summernote id="smn' + attr.name + '" name="smn' + attr.name + '" data-ng-model="model" placeholder="{{\'phd' + attr.name + '\' | translate | html}}" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '></summernote>'
            + '</div>'

            + '<div class="col-sm-9 txtView" ng-show="viewMode">'
            + '<p ng-bind-html="model"></p>'
            + '</div>'
            + '</div>';
        } else {
          return '<div class="form-group">'
            + '<div class="col-sm-12" ng-hide="viewMode">'
            + '<summernote id="smn' + attr.name + '" name="smn' + attr.name + '" data-ng-model="model" placeholder="{{\'phd' + attr.name + '\' | translate | html}}" ' + (JSON.parse(attr.required || 'false') ? 'required' : '') + '></summernote>'
            + '</div>'

            + '<div class="col-sm-12" ng-show="viewMode">'
            + '<p ng-bind-html="model"></p>'
            + '</div>'
            + '</div>';
        }
      },
      replace: true
    };
  });