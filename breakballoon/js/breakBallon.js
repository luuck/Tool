(function () {
    var positions = [];
    var isMove = false;
    var $spSights; // $('span.sights'); 瞄准器
    var $divB2; // $('div.b2'); 气球区域
    var b2Offset; // $("div.b2").offset();
    var fixedHeight = 70;
    var time;
    window.hasClick = false;

    function BreakBalloon(opts){
        this._opts = opts || {};
        this._opts.wrapper = opts.wrapper || 'div.b2'; // 包裹气球区域
        this._opts.aim = opts.aim || 'span.sights'; // 瞄准器
        this._opts.balloon = opts.balloon || '.list li'; // 气球
        this._opts.time = opts.time || 1000; // 击破气球到复原完整气球时间间隔

        //回调方法
        this._opts.success = opts.success || function(){};
        this._opts.error = opts.error || function(){};

        this._init(this._opts);
    }

    BreakBalloon.prototype = {
        dealBallon: function(currentInex){ // 击破气球动态效果
            var $balloon = $('div.b2').find('div.balloon');
            $($balloon.get(currentInex)).parent("li").addClass("hit_on");
            window.hasClick = true;
            setTimeout(function () {

                $($balloon.get(currentInex)).parent("li").animate({}, 'slow', function () {
                    $($balloon.get(currentInex)).parent("li").removeClass('hit_on');
                    window.hasClick = false;
                });
            }, time);
        },
        _mouseClick: function(){
            var _this = this;
            $spSights.bind('click', function (event) {
                if (window.hasClick) {
                    return;
                }

                var newX = parseInt(event.pageX || event.clientX),
                    newY = parseInt(event.pageY || event.clientY),
                    _offsetLeft = parseInt(b2Offset.left),
                    _offsetTop = parseInt(b2Offset.top);

                var _left = newX - _offsetLeft;
                var _top = newY - _offsetTop;
                var currentInex;

                for (var i = 0; i < positions.length; i++) {
                    if (_left >= positions[i].x1 && _left <= positions[i].x2 && _top >= positions[i].y1 && _top <= positions[i].y2) {
                        currentInex = i;
                        break;
                    }
                }

                _this.success(currentInex); // 成功击破气球
            });
        },
        _mouseFollow: function () {
            $divB2.mousemove(function (event) {
                //移动瞄准器
                isMove = true;
                if (!isMove) return;
                var newX = parseInt(event.pageX || event.clientX),
                    newY = parseInt(event.pageY || event.clientY),
                    _offsetLeft = parseInt(b2Offset.left),
                    _offsetTop = parseInt(b2Offset.top);
                if ((newX > _offsetLeft) &&
                    (newX <= ($('.b2 .list').width() + _offsetLeft)) &&
                    (newY > _offsetTop + 40) &&
                    (newY <= (_offsetTop + $divB2.height()) - fixedHeight)
                ) {

                    $spSights.css("left", (newX - _offsetLeft - 50) + "px");
                    $spSights.css("top", (newY - _offsetTop - 50) + "px");
                    $spSights.show();
                }
            });

            $divB2.mouseout(function () {
                $spSights.hide();
                $spSights.css("left", "-300px");
                $spSights.css("top", "-300px");
            });
        },
        _positionCal: function () {
            $divB2.find('div.balloon').each(function (index) {
                var _balloonOffset = $(this).offset();
                positions[index] = {
                    x1: parseInt(_balloonOffset.left) - parseInt(b2Offset.left),
                    y1: parseInt(_balloonOffset.top) - parseInt(b2Offset.top),
                    x2: parseInt(_balloonOffset.left) - parseInt(b2Offset.left) + parseInt($(this).width()),
                    y2: parseInt(_balloonOffset.top) - parseInt(b2Offset.top) + parseInt($(this).height())
                };
            });
        },
        _supportCss3: function(style){
            var prefix = ['webkit', 'Moz', 'ms', 'o'];
            var i1,i2;
            var humpString = [];
            var htmlStyle = document.documentElement.style;
            var _toHumb = function(string) {
                return string.replace(/-(\w)/g, function($0, $1) {
                    return $1.toUpperCase();
                });
            };

            for (i1 in prefix)
                humpString.push(_toHumb(prefix[i1] + '-' + style));

            humpString.push(_toHumb(style));

            for (i2 in humpString)
                if (humpString[i2] in htmlStyle) return true;

            return false;
        },
        _moveSights:function(){
            this._positionCal(); // 位置计算
            this._mouseFollow(); // 鼠标跟随
            this._mouseClick(); // 点击气球
        },
        _init:function(opts){
            var _this = this;
            var $ulli = $(opts.balloon);
            $spSights = $(opts.aim);
            $divB2 = $(opts.wrapper);
            b2Offset = $divB2.offset();
            time = opts.time;
            this.success = opts.success; // 成功处理函数

            window.onresize = function(){
                _this._moveSights();
            };
            _this._moveSights();

            if (!this._supportCss3('animation')) {
                $ulli.shake(99999, 20, 1000);
            }
        }
    };

    window.BreakBalloon = BreakBalloon;
})();