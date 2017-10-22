$(function () {
    $('.button-checkbox').each(function () {
        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });

        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});

function myAlert(Msjtype, Msjtext, fnClose, fnShow) {
    new Noty({
        type: Msjtype,
        layout: 'topRight',
        theme: 'metroui',
        text: Msjtext,
        timeout: 3000,
        progressBar: true,
        closeWith: ['click'],
        animation: {
            open: 'noty_effects_open',
            close: 'noty_effects_close'
        },
        id: false,
        force: false,
        killer: false,
        queue: 'global',
        container: false,
        buttons: [],
        sounds: {
            sources: [],
            volume: 1,
            conditions: []
        },
        titleCount: {
            conditions: []
        },
        modal: false,
        callbacks: {
            beforeShow: function () { },
            onShow: function () { },
            afterShow: function () { },
            onClose: function () { if (fnClose != undefined && fnClose != null) { fnClose(); } },
            afterClose: function () { },
            onHover: function () { },
            onTemplate: function () {
                // Important: .noty_body class is required for setText API method.
            }
        }
    }).show();
}

function ValExtPermitidas(e) {
    var filename = e.value;
    extensiones_permitidas = new Array(".xls", ".xlsx", ".pdf", ".doc", ".docx", ".jpg", ".png");

    //recupero la extensión de este nombre de archivo
    extension = (filename.substring(filename.lastIndexOf("."))).toLowerCase();
    //compruebo si la extensión está entre las permitidas
    permitida = false;
    for (var i = 0; i < extensiones_permitidas.length; i++) {
        if (extensiones_permitidas[i] == extension) {
            permitida = true;
            break;
        }
    }

    if (permitida) {
        var lastIndex = filename.lastIndexOf("\\");
        if (lastIndex >= 0) {
            filename = filename.substring(lastIndex + 1);
        }

        //Ajustar Nombre del Archivo:
        var vNombre = filename.split(".");
        if (vNombre != null && vNombre.length >= 2) {
            if (vNombre[0].length > 15) {
                filename = vNombre[0].substring(0, 15) + '...' + vNombre[1];
            }
        }

        $(e).parents('.input-group').find('.txtUpload').val(filename);
    }

    return permitida;
}