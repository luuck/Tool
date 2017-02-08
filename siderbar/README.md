## siderbar
[demo](https://luuck.github.io/tool/siderbar/siderbar.html)

### 使用方法
1、引入文件
```
<script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
<script src="jquery.sidebar.js"></script>
```

2、HTML
```
<div class="sidebar"></div>
```

3、Javascript
```
$('.sidebar').sidebar({
    width: 100,
    height: 300,
    pageContentWidth: 1020, //设置内容宽度，决定浮窗显示的位置，如果为0，则靠右显示，并可设置marginRight
    marginRight: 0,
    isFixedTop: false, // 是否固定在顶部
    fixedTopDis: 0, // 固定在顶部后距离顶部的高度
    isScrollShow: false, // 距离顶部低于100隐藏
    color: '#1ab992', // 为空则无色
    backFn: function() {
        // 回调函数处理
    }
});
```


