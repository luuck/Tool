## siderbar
[demo](https://luuck.github.io/tool/siderbar/siderbar.html)

### 使用方法
1、引入文件
```Javascript
<script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
<script src="jquery.sidebar.js"></script>
```

2、HTML
```HTML
<div class="sidebar"></div>
```

3、Javascript
```
 var siderbar = new Sidebar({
            wrapper: '.side', // 必填,选择器
            pageW: '.container',
            width: 249,
            height: 612,

            // 设置内容宽度，决定浮窗显示的位置，
            // 默认为0，则直接靠左或者靠右
            // 否则，靠近内容边缘
            pageContentWidth: 1000,

            // 距离左边或者右边边缘的距离(数值)
            // 带票position的第一个参数"left"或者"right"使用
            lrDistance: 0,
            // 距离上边或者下边边缘的距离(数值)
            // 搭配position的第二个参数为"top"或者"bottom"使用
            tbDistance: 0,

            // 必须设置两个参数：
            // 第一个参数可赋值"left"或者"right"
            // 第二个参数可赋值"top"或者"bottom"或者"middle"
            // 默认["right","mid"]
            position:["left", "top"],

            // 滚动到距离顶部200时显示(数值)
            scrollTopShow: 600,
            callfn: function(){
                 // 回调处理
                /*if($(window).scrollTop()<600){
                    $('.side').css({
                        position: 'absolute',
                        top: 600,
                        left: 0,
                        width: 249
                    })
                }*/

            }
        });
```


