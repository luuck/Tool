## numscroll
[demo](https://luuck.github.io/tool/numscroll/index.html)

### 使用方法
1、引入文件
```
<link rel="stylesheet" href="css/index.css?v=20170208">
```
css样式是必须的需要引入

```
<script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
```
依赖于这个jquery,必须引入

2、HTML
```
<div class="top-con-nums">
        <span class="sp1"><em></em></span>
        <span class="sp2"><em></em></span>
        <span class="sp3"><em></em></span>
        <span class="sp4"><em></em></span>
        <span class="sp5"><em></em></span>
        <span class="sp6"><em></em></span>
        <span class="sp7"><em></em></span>
    </div>
```

3、Javascript
```
 var arrTop = [0, 68, 135, 203, 271, 339, 408, 477, 545, 614], //数字滚动坐标
        numScrollLength = $('.top-con-nums em').length,
        $numScroll = $('.top-con-nums em');

    function changeNumTop(curIndex, i) {
        $numScroll.eq(numScrollLength - 1 - i).animate({
            top: '-' + arrTop[curIndex] + 'px'
        }, 1500);
    }

    function init(monNum) {
        var result = 0,
            len = 0,
            arr = [],
            monarr = [];

        result = monNum;
        len = (result + '').length;
        arr = (result + '').split('');

        if (len < 7) {
            var lastLen = 7 - len;
            for (var i = 0; i < lastLen; i++) {
                arr.unshift("0");
            }
        }

        monarr = arr;

        for (var i = 0; i < numScrollLength; i++) {
            if ($numScroll.eq(numScrollLength - 1 - i)[0].name != monarr[monarr.length - 1 - i]) {
                $numScroll.eq(numScrollLength - 1 - i)[0].name = monarr[monarr.length - 1 - i];
                var curIndex = $numScroll.eq(numScrollLength - 1 - i)[0].name;
                changeNumTop(curIndex, i);
            }
        }
    }

    var surplusNum = 1;

    setTimeout(function() {
        // ajax请求数据,且更改surplusNum值
        // .....
        // end
        // 假设ajax请求后的值为4908909
        init(4908909);

        var obj = setInterval(function() {
            if (surplusNum === 0) {
                clearTimeout(obj);
                return;
            }


            // ajax请求数据,且更改surplusNum值
            // .....
            // end
            // 假设ajax请求后的值为4908909
            init(4908787);

        }, 1000);
    }, 600);

    init(5000000); // 初始化500万
```

