## introtip
[demo](https://luuck.github.io/tool/introtip/index.html)

### 使用方法
1、引入文件

```Javascript
<script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
<script src="assets/js/introtip.js"></script>
```
依赖于这个jquery,必须引入

2、introtip.js对外暴露的方法有

![](https://raw.githubusercontent.com/luuck/tool/master/introtip/assets/img/intropImg.jpg)

3、如何使用？
```Javascript
   // 配置项
    var configInfo = {
        obj: '#ipt', // 必填
        width: 430, // 图片的宽度
        height: 303, // 图片的高度
        imgUrl: 'https://raw.githubusercontent.com/luuck/tool/master/introtip/assets/img/tip.png', // 图片路径
        top: 40, // 图片距离顶部
        left: 40, // 图片距离左边
        callback: function() {}
    };

    // var introTipOBJ1 = new IntroTip(configInfo);
    var introTipOBJ1 = IntroTip(configInfo);

    introTipOBJ1.init(configInfo);
    $('#ipt').focus(function() { // 聚焦
        introTipOBJ1.iptFocus(configInfo);
    });

    $('#ipt').blur(function() { // 失焦
        introTipOBJ1.iptBlur(configInfo);
    });

```

