/**
 * @author deng.zhang
 * created on 2015/12/13.
 */

$(function () {
    initSidebarMenu();
});

/**
 * 初始化侧边栏菜单
 */
function initSidebarMenu() {
    $('ul#sidebarMenu li.sidebar-menu-item').click(function () {
        $('ul#sidebarMenu li.sidebar-menu-item').removeClass('active');
        $(this).addClass('active');
        if ($(this).find('a').attr('rel')) {
            $.ajax({
                type: 'post',
                url: $(this).find('a').attr('rel'),
                cache: false,
                async: false,
                success: function (content) {
                    if (content) {
                        $('#contentContainer').html(content);
                    }
                },
                error: function () {
                    alert("Load page error!")
                }
            });
        } else {
            $('#warningDialog').modal('show');
        }
    });
}

/**
 * 格式化日期
 *
 * @param date 日期对象
 * @returns {string} 日期字符串，格式为：yyyy-MM-dd HH:mm:ss
 */
function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
        + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':'
        + (seconds < 10 ? '0' + seconds : seconds);
}

/**
 * 将字符串转换成Date对象
 * 日期字符串格式：yyyy-MM-dd HH:mm:ss
 *
 * @param dateStr 日期字符串
 * @returns {Date}
 */
function stringToDate(dateStr) {
    if (!dateStr) {
        return null;
    }

    var datePart = dateStr.split(" ")[0];
    var timePart = datePart.split(" ")[1];

    var year = parseInt(datePart.split("-")[0], 10);
    var month = parseInt(datePart.split("-")[1], 10) - 1;
    var date = parseInt(datePart.split("-")[2], 10);
    var hour = parseInt(timePart.split(":")[0], 10);
    var minute = parseInt(timePart.split(":")[1], 10);
    var second = parseInt(timePart.split(":")[2], 10);

    var dateTime = new Date();
    dateTime.setFullYear(year);
    dateTime.setMonth(month);
    dateTime.setDate(date);
    dateTime.setHours(hour);
    dateTime.setMinutes(minute);
    dateTime.setSeconds(second);
    dateTime.setMilliseconds(0);

    return dateTime;
}
