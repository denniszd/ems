/**
 * 该文件用于记录对框架源码的改动以及为达到某些想要的效果需要加入框架的代码
 *
 * @author deng.zhang
 * Created on 2015/12/17.
 */

/**
 * 修改了AdminLTE.controlSidebar的_fix方法
 * 源码中存在如下Bug：在Control Sidebar中勾选Fixed Layout，然后取消勾选Fixed Layout，这个时候Control Sidebar的位置被固定了
 * 解决方案：注释掉'position': 'fixed'
 */
$.AdminLTE.controlSidebar = {
    _fix: function (sidebar) {
        var _this = this;
        if ($("body").hasClass('layout-boxed')) {
            sidebar.css('position', 'absolute');
            sidebar.height($(".wrapper").height());
            $(window).resize(function () {
                _this._fix(sidebar);
            });
        } else {
            sidebar.css({
                //'position': 'fixed',
                'height': 'auto'
            });
        }
    }
};

/**
 * 修改$.Modal.prototype.adjustDialog方法，以使模态框弹出的位置在页面中部
 */
$.Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

    this.$element.css({
        paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
        paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });

    //以下代码用于设置弹出框居中
    var $modal_dialog = $(this.$element[0]).find('.modal-dialog');
    var m_top = ( $(document).height() - $modal_dialog.height() ) / 2 - 20;
    $modal_dialog.css({'margin': m_top + 'px auto'});
};