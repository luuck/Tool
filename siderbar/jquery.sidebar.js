/**
 * v1.3.0
 * [右侧悬浮窗组插件]
 * 组件依赖：jquery1.7.2+
 */
(function(){

    var $sidebar;
    var isIe6 = 'undefined' == typeof(document.body.style.maxHeight);
    var h;

    function Sidebar(opts){
        this._opts = opts || {};
        this._opts.wrapper = opts.wrapper;
        this._opts.pageW = opts.pageW;
        this._opts.width = opts.width || 30;
        this._opts.height = opts.height || 100;
        this._opts.pageContentWidth = opts.pageContentWidth || 0;
        this._opts.lrDistance = opts.lrDistance || 0;
        this._opts.tbDistance = opts.tbDistance || 0;
        this._opts.position = opts.position || ['right','middle'];
        this._opts.scrollTopShow = opts.scrollTopShow || 0;
        this._opts.scrollfn = function(){};
        this._init(this._opts);
    }

    Sidebar.prototype = {
        _scroll: function(args){
            var _OffsetMidNum;
            var _a;
            $sidebar = $(args.wrapper);

            if(args.position[1].toLowerCase() === 'bottom') {
                _OffsetMidNum = $(window).height() / 2 < $sidebar.height() ? $sidebar.height() / 2 : $sidebar.height();
                _a = $(window).height() / 2 + $(window).scrollTop() + _OffsetMidNum + args.tbDistance;
                $sidebar.css({'top': _a});
                return;
            }else if(args.position[1].toLowerCase() === 'top'){
                _a = $(window).scrollTop() + args.tbDistance ;
                $sidebar.css({'top': _a});
                return;
            }

            var _scrollTop = $(window).height() / 2 - h / 2;
            _scrollTop = _scrollTop + $(window).scrollTop();
            $sidebar.css({ 'top': _scrollTop } );
        },
        _initCss: function(args){
            // var w = $(window).width(); //浏览器当前窗口可视区域宽度
            var w = $(args.pageW).width(); // 相对于某个的宽度
            $sidebar = $(args.wrapper);
            if (args.pageContentWidth > 0 && w > 980) {
                // args.lrDistance = (w - args.pageContentWidth) / 2 - args.width;
                // edit by 2018.03.06
                if($(window).width() >= w){
                    args.lrDistance = ($(window).width() - w) / 2 - args.width;
                }
            }

            $sidebar.css({
                'width': args.width + 'px',
                'height': +args.height + 'px'
            });

            if(args.position[0].toLowerCase() === 'left'){
                $sidebar.css({
                    'left': args.lrDistance + 'px'
                });
            }else{
                $sidebar.css({
                    'right': args.lrDistance + 'px'
                });
            }
        },
        _isShow: function(args){
            var _this = this;
            _this._initCss(args);
            $sidebar = $(args.wrapper);
            var _scrollTop = $(window).scrollTop();
            var _num = args.scrollTopShow;
            if (_scrollTop < _num) {
                $sidebar.hide();
            } else {
                $sidebar.show();
            }
        },
        _isScrollLoad: function(args){
            var _this = this;
            if (args.scrollTopShow) {
                _this._isShow(args);
                args.scrollfn = $(window).scroll(function() {
                    _this._isShow(args);
                });

            } else {
                _this._initCss(args);
            }
        },
        _init: function(args){
            var _this = this;
            $sidebar = $(args.wrapper);
            h = args.height;

            _this._isScrollLoad(args);

            if($sidebar.css("display")=='none' && args.scrollTopShow == 0){
                $sidebar.css("display",'inline-block');
            }

            // ie6特殊处理
            if(isIe6){
                $sidebar.css('position','absolute');
                _this._scroll(args);
                args.scrollfn = $(window).scroll(function() {
                    // alert(args.wrapper);
                    _this._scroll(args);
                });
                return;
            }

            if(args.position[1].toLowerCase() === 'top'){ // 固定在顶部
                $sidebar.css({ 'top': args.tbDistance, 'position': 'fixed' });

            }else if(args.position[1].toLowerCase() === 'bottom'){ // 固定在底部
                $sidebar.css({ 'bottom': args.tbDistance, 'position': 'fixed' });

            }else{ // 居中显示
                var _scrollTop = $(window).height() / 2 - args.height / 2;
                $sidebar.css({ 'top': _scrollTop, 'position': 'fixed' });
            }
        }
    };

    window.Sidebar = Sidebar;
})();
