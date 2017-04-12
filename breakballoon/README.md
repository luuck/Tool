## breakballon
[demo](https://luuck.github.io/tool/breakballoon/index.html)

### 使用方法
1、引入文件

```Javascript
<script src="js/jquery.js"></script>
<script src="js/jquery.shake.js"></script>
<script src="js/breakBallon.js"></script>
```

2、如何使用？
```Javascript
  var bB = new BreakBalloon({
        wrapper: 'div.b2', // 包裹气球区域
        aim: 'span.sights', // 瞄准器
        balloon: '.list li', // 气球位置
        time: 600, // 击破气球到复原完整气球时间间隔
        success: function (currentInex) {
            console.log("击破气球");
            console.log(currentInex);
            /*
             * 这里可以判断是否登录
             * ````
             */

            if (currentInex !== undefined) {
                /*
                 * 这里可进行后台请求
                 * ```
                 */

                // 后台成功处理，击破气球后动态效果
                bB.dealBallon(currentInex);
                alert(currentInex);
            }

        },
        error: function (data) {
            console.log("击破气球失败,请重试！");
            console.log(data);
        }
    });
```

