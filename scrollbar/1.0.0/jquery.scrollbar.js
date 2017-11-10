/**
 * v1.0.0
 * [页面局部滚动插件]
 * 组件依赖：jquery1.7.2+
 */
(function(){
    var $scrollbar;
    function Scrollbar(opts){
        this._opts = opts || {};
        this._opts.wrapper = opts.wrapper;
        this._opts.width = opts.width;
        this._opts.height = opts.height;
        this._opts.niceScroll = opts.niceScroll;
        this._opts.scrollload = opts.scrollload;
        this._opts.callback = opts.callback;
        this._opts.beforeload = opts.beforeload;
        this._init(this._opts);
    }

    Scrollbar.prototype = {
        _scrollLoad: function(args){
            var _this = this;
            // 当scrollload为true时才可以滚动加载
            if(args.scrollload){
                // 滚动加载
                $scrollbar.on('scroll', function () {
                    // 可见高度
                    var viewH = $(this).height();
                    // 内容高度
                    var contentH = $(this).get(0).scrollHeight;
                    // 滚动高度
                    var scrollTop = $(this).scrollTop();
                    // 到达底部100px时,加载新内容
                    if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
                        // if (scrollTop / (contentH - viewH) >= 0.95) {
                        // 触发回调函数，得到更多数据
                        args.callback();
                    }
                });
            }
        },
        _init: function(args){
            var _this = this;
            $scrollbar = $(args.wrapper);
            $scrollbar.width(args.width);
            $scrollbar.height(args.height);
            // 在初始化美化滚动条之前处理的函数
            args.beforeload();
            // 初始化滚动条
            $scrollbar.niceScroll(args.niceScroll);
            // 滚动加载
            _this._scrollLoad(args);
        }
    };

    window.Scrollbar = Scrollbar;
})();
