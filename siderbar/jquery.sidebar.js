/**
 * [右侧悬浮窗组插件]
 * 组件依赖：jquery1.7.2+
 */

(function($) {
    var scrollTop;
    var $sidebar;
    var fromBottom = 0;
    var isFixedTop;
    var fixedTopDis;
    var isIe6 = 'undefined' == typeof(document.body.style.maxHeight);
    var lr = {
        scroll: function() {
            scrollTop = isFixedTop ? $(window).scrollTop() + fixedTopDis : $(window).scrollTop() + fromBottom;
            $sidebar.css('top', scrollTop + 'px');
        },
        initCss: function(args) {
            var w = $(window).width(); //浏览器当前窗口可视区域宽度
            if (args.pageContentWidth > 0 && w > 980) {
                args.marginRight = (w - args.pageContentWidth) / 2 - args.width;
            }

            $sidebar.css({
                'width': args.width + 'px',
                'height': +args.height + 'px',
                'right': args.marginRight + 'px',
                'background-color': args.color
            });
        },
        isScrollLoad: function(args) {
            if (args.isScrollShow) {
                $(window).off('scroll').scroll(function() {
                    lr.initCss(args);
                    var _scrollTop = $(window).scrollTop();
                    if (_scrollTop < 100) {
                        $sidebar.hide();
                    } else {
                        $sidebar.show();
                    }
                });

            } else {
                lr.initCss(args);
            }

        },
        init: function(obj, args) {
            $sidebar = obj;
            fromBottom = args.fromBottom;
            isFixedTop = args.isFixedTop;
            fixedTopDis = args.fixedTopDis;

            lr.isScrollLoad(args);

            if (isIe6) { // ie6特殊处理
                $sidebar.css('position', 'absolute');
                lr.scroll();
                window.onscroll = lr.scroll;
            } else {
                if (args.isFixedTop) {
                    $sidebar.css({ 'top': args.fixedTopDis, 'position': 'fixed' });
                    return;
                }
                var _scrollTop = $(window).height() / 2 - fromBottom;
                $sidebar.css({ 'top': _scrollTop, 'position': 'fixed' });
            }

            args.backFn(); // 回调函数
        }
    };

    $.fn.sidebar = function(options) {
        return this.each(function() {
            var args = $.extend({}, {
                width: 200,
                height: 300,
                pageContentWidth: 980,
                marginRight: 0, //  悬浮窗和页面右侧间隔距离
                isFixedTop: false, // 是否固定在顶部
                fixedTopDis: 0,
                isScrollShow: false, // 距离顶部低于100隐藏
                fromBottom: 130, // 悬浮窗和页面底部的间隔距离
                color: '',
                backFn: function() {}
            }, options);
            lr.init($(this), args);
        });
    };
})(jQuery);
