/**
 * [引导提示弹窗插件]
 * 组件依赖：jquery1.7.2+
 */
(function($) {
    var $ipt; // $('#ipt')
    var $introtip; // $('.introTip')
    var interval; // 定时器
    var intervalBool;
    var isIe6 = 'undefined' == typeof(document.body.style.maxHeight);
    var isIptfoucs = false; // 未聚焦

    var showIntroTip = {
        option: {
            id: 0,
            obj: '#ipt',
            top: 0,
            left: 0,
            isShow: false, // 是否显示,默认false不显示
            isHover: false, // 悬停显示,默认false不显示 
            callback: function() {}
        },
        hideTip: function() { // 隐藏
            if (isIe6) {
                $introtip.hide();
            } else {
                $introtip.stop().animate({
                    'opacity': 0
                }, 700);
            }
        },
        showTip: function() { // 显示
            if (isIe6) {
                $introtip.show();
            } else {
                $introtip.stop().animate({
                    'opacity': 1
                }, 700);
            }
        },
        isClearInterval: function() { // 清除定时器
            intervalBool = typeof(interval) == 'undefined';
            if (!intervalBool) {
                window.clearTimeout(interval);
            }
        },
        iptBlur: function() { // 输入框失焦
            isIptfoucs = false; // 失焦中
            this.hideTip();
            this.isClearInterval(); // 是否需要清除定时器
        },
        iptFocus: function(opts) { // 输入框聚焦
            isIptfoucs = true; // 聚焦中
            var _this = this;
            _this.initCss('.introTip', opts);
            _this.showTip();

            interval = setTimeout(function() { // edit by ql
                _this.hideTip();
                $introtip.hover(function() {
                    _this.isClearInterval(); // 是否需要清除定时器
                });
            }, 3000);

            /*interval = setTimeout(function() {
                _this.hideTip();
            }, 3000);*/
        },
        iptHover: function(opts) { // 悬停
            var _this = this;
            $ipt.hover(function() {
                _this.initCss('.introTip', opts);
                _this.showTip();

                if (isIptfoucs) { // 聚焦中 add by ql
                    interval = setTimeout(function() {
                        _this.hideTip();
                        $introtip.hover(function() {
                            _this.isClearInterval(); // 是否需要清除定时器
                        });
                    }, 3000);
                }

            }, function() {
                $introtip.hover(function() {
                    _this.isClearInterval(); // 是否需要清除定时器
                }, function() {
                    _this.hideTip();
                });
            });
        },
        initCss: function(obj, args) {
            $(obj).css({
                'width': '430px',
                'height': '303px',
                'position': 'absolute',
                'top': args.top + 'px',
                'left': args.left + 'px',
                'overflow': 'hidden',
                'background-image': 'url(assets/img/tip.png)',
                'z-index': 100
            });
        },
        initHtml: function(opts) {
            $ipt = $(opts.obj);
            $ipt.after('<div class="introTip"></div>');
            $introtip = $('.introTip');
            if (opts.isShow) { // 初始化是否显示
                this.initCss('.introTip', opts);
                this.showTip();
            } else {
                this.hideTip();
            }

            if (opts.isHover) { // 悬停是否显示
                this.iptHover(opts);
            }
        },
        init: function(opts) {
            $.extend({}, this.option, opts);
            this.initHtml(opts);
            opts.callback();
        }
    };
    $.extend({
        showIntroTip: function(opts) {
            showIntroTip.init(opts);
        }
    });
    window.showIntroTip = showIntroTip;
})(jQuery);
