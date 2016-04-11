/**
 * @author deng.zhang
 * Crated on 2015/12/19.
 */
(function ($, AdminLTE) {

    "use strict";

    /**
     * List of all the available skins
     *
     * @type Array
     */
    var my_skins = [
        "skin-blue",
        "skin-black",
        "skin-red",
        "skin-yellow",
        "skin-purple",
        "skin-green",
        "skin-blue-light",
        "skin-black-light",
        "skin-red-light",
        "skin-yellow-light",
        "skin-purple-light",
        "skin-green-light"
    ];

    initSidebarOptions();

    /**
     * Toggles layout classes
     *
     * @param cls the layout class to toggle
     */
    function changeLayout(cls) {
        var $body = $("body");
        var $controlSidebar = $(".control-sidebar");
        if ($body.hasClass('fixed') && cls == "fixed") {
            AdminLTE.controlSidebar._fixForContent($controlSidebar);
        }
        $body.toggleClass(cls);
        AdminLTE.layout.fixSidebar();
        if ($body.hasClass('fixed') && cls == 'fixed') {
            AdminLTE.pushMenu.expandOnHover();
            AdminLTE.layout.activate();
        }
        AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        AdminLTE.controlSidebar._fix($controlSidebar);

        $('#control-sidebar').css('position','absolute');
    }

    /**
     * Replaces the old skin with the new skin
     * @param cls the new skin class
     * @returns Boolean false to prevent link's default action
     */
    function changeSkin(cls) {
        $.each(my_skins, function (i) {
            $("body").removeClass(my_skins[i]);
        });

        $("body").addClass(cls);
        store('skin', cls);
        return false;
    }

    /**
     * Store a new settings in the browser
     *
     * @param  name Name of the setting
     * @param  val Value of the setting
     * @returns void
     */
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view the push center monitor!');
        }
    }

    /**
     * Get a prestored setting
     *
     * @param  name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view the push center monitor!');
        }
    }

    /**
     * Retrieve default settings and apply them to the template
     *
     * @returns void
     */
    function initSidebarOptions() {
        var tmp = get('skin');
        if (tmp && $.inArray(tmp, my_skins))
            changeSkin(tmp);

        //Add the change skin listener
        $("[data-skin]").on('click', function (e) {
            e.preventDefault();
            changeSkin($(this).data('skin'));
        });

        //Add the layout manager
        $("[data-layout]").on('click', function () {
            changeLayout($(this).data('layout'));
        });

        $("[data-controlsidebar]").on('click', function () {
            changeLayout($(this).data('controlsidebar'));
            var slide = !AdminLTE.options.controlSidebarOptions.slide;
            AdminLTE.options.controlSidebarOptions.slide = slide;
            if (!slide)
                $('.control-sidebar').removeClass('control-sidebar-open');
        });

        $("[data-sidebarskin='toggle']").on('click', function () {
            var sidebar = $(".control-sidebar");
            if (sidebar.hasClass("control-sidebar-dark")) {
                sidebar.removeClass("control-sidebar-dark");
                sidebar.addClass("control-sidebar-light");
            } else {
                sidebar.removeClass("control-sidebar-light");
                sidebar.addClass("control-sidebar-dark");
            }
        });

        $("[data-enable='expandOnHover']").on('click', function () {
            $(this).attr('disabled', true);
            AdminLTE.pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
                $("[data-layout='sidebar-collapse']").click();
        });

        // Reset options
        var $body = $('body');
        if ($body.hasClass('fixed')) {
            $("[data-layout='fixed']").attr('checked', 'checked');
        }
        if ($body.hasClass('layout-boxed')) {
            $("[data-layout='layout-boxed']").attr('checked', 'checked');
        }
        if ($body.hasClass('sidebar-collapse')) {
            $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
        }

    }
})(jQuery, $.AdminLTE);
