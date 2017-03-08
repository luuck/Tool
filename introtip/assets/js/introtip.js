/**
 * [引导提示弹窗组件]
 * 组件依赖：jquery1.7.2+
 */
(function() {
    var $ipt;
    var $introtip; 
    var interval; // 定时器
    var intervalBool;
    var isIe6 = 'undefined' == typeof(document.body.style.maxHeight);
    var isIptfoucs = false; // 未聚焦

    var showIntroTipObj = {
        option: {
            obj: '#ipt',
            top: 0,
            left: 0,
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
        iptBlur: function(opts) { // 输入框失焦
            isIptfoucs = false; // 失焦中
            var _this = this;
            _this.hideTip();
            _this.isClearInterval(); // 是否需要清除定时器
        },
        iptFocus: function(opts) { // 输入框聚焦
            isIptfoucs = true; // 聚焦中
            var _this = this;
            _this.initCss('.introTip', opts);
            _this.showTip();
            _this.autoDisappear();
        },
        autoDisappear: function() { // 自动消失
            var _this = this;
            interval = setTimeout(function() {
                _this.hideTip();
                $introtip.hover(function() {
                    _this.isClearInterval(); // 是否需要清除定时器
                });
            }, 3000);
        },
        iptHover: function(opts) { // 悬停-废弃
            var _this = this;
            $ipt.hover(function() {
                _this.initCss('.introTip', opts);
                _this.showTip();

                if (isIptfoucs) { // 聚焦中
                    _this.autoDisappear(); // 自动消失
                }

            }, function() {
                $introtip.hover(function() {
                    _this.isClearInterval(); // 是否需要清除定时器
                }, function() {
                    _this.hideTip();
                });
            });
        },
        hide: function() {
            var _this = this;
            $introtip.hover(function() {
                _this.isClearInterval(); // 是否需要清除定时器
            }, function() {
                _this.hideTip();
            });
        },
        show: function(opts) {
            var _this = this;
            _this.initCss('.introTip', opts);
            _this.showTip();
            if (isIptfoucs) { // 聚焦中
                _this.autoDisappear(); // 自动消失
            }
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
                'z-index': 9999,
                'opacity': 0
            });
        },
        initHtml: function(opts) {
            $ipt = $(opts.obj);
            $ipt.after('<div class="introTip"></div>');
            $introtip = $('.introTip');
        },
        init: function(opts) {
            var _this = this;
            $.extend({}, _this.option, opts);
            _this.initHtml(opts);
        }
    };

    var introtipExport = function() { // 对外暴露方法
        return {
            init: function(opts) { // 初始化
                showIntroTipObj.init(opts);
            },
            iptFocus: function(opts) { // 聚焦
                showIntroTipObj.iptFocus(opts);
            },
            iptBlur: function(opts) { // 失焦
                showIntroTipObj.iptBlur(opts);
            },
            show: function(opts){ // 显示
                showIntroTipObj.show(opts);
            },
            hide: function(){ // 隐藏
                showIntroTipObj.hide();
            }
        };
    };

    window.IntroTip = introtipExport;
})();
