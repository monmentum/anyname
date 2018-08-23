// 封装为插件，但是在插件中最好不要使用id，id具有唯一性，插件是为了能够被重复使用，在一个页面上可能会重复调用多次，会造成页面冲突。变量的命名以及方法的命名，尽量特别，与众不同。class的命名，prev,next等太简单，重复率较高。插件的文件命名，index.js,index.css也很大众化。

(function ($) {
    // 每次调用只会产生一个轮播图的功能，这个函数的作用域只能分配给一个轮播图。所以要求在调用本函数的收务必将轮播图和标签传递过来


    var slide = function (element,options) {
        var $element = $(element);
        // 默认的设置选项
        var setting = {
            // 控制出现的时间
            delay: 1000,
            // 控制轮播速度
            speed: 3000
        };

        // 对象合并
        // para1：boolean类型，表示是否深度合并，默认false，不支持参数为false，所以改为true，若多个对象的某个属性也是对象，则该属性对象也将进行合并
        // para2,para3,.. 都是合并的对象
        $.extend(true,setting,options);


        var states = [{
                zindex: 1,
                width: 150,
                height: 122,
                top: 60,
                left: 120,
                opacity: 0.2
            },
            {
                zindex: 2,
                width: 170,
                height: 140,
                top: 40,
                left: 0,
                opacity: 0.4
            },
            {
                zindex: 3,
                width: 190,
                height: 160,
                top: 20,
                left: 122,
                opacity: 0.8
            },
            {
                zindex: 4,
                width: 210,
                height: 180,
                top: 0,
                left: 245,
                opacity: 1
            },
            {
                zindex: 3,
                width: 190,
                height: 160,
                top: 20,
                left: 387,
                opacity: 0.8
            },
            {
                zindex: 2,
                width: 170,
                height: 140,
                top: 40,
                left: 530,
                opacity: 0.4
            },
            {
                zindex: 1,
                width: 150,
                height: 120,
                top: 60,
                left: 420,
                opacity: 0.2
            }
        ];
        var lis = $(element).find('li');

        function move() {
            lis.each(function (index, item) {
                var state = states[index];
                $(item).css('z-index', state.zindex).finish().animate(state, setting.delay).find('img').css('opacity', state.opacity);
            })
        }
        move();
        // 下一张
        function next() {
            states.unshift(states.pop());
            move();
        }

        // 上一张
        function prev() {
            states.push(states.shift());
            move();
        }
        $(element).find('.slide-prev').click(function () {
            prev();
        })
        $(element).find('.slide-next').click(function () {
            next();
        })

        // 自动轮播
        var time = null;

        function autopl() {
            time = setInterval(function () {
                next();
            }, setting.speed)
        }
        autopl();
        $element.find('section').add(lis).hover(function () {
            clearInterval(time);
        }, function () {
            autopl();
        })



    }

    $.fn.ZzZzzzslide = function (options) {
        $(this).each(function (index, ele) {
            slide(ele,options);
        })
        return this;
    }




    // var lis = $('#box li');

    // function move() {
    //     lis.each(function (index, item) {
    //         console.log(item);
    //         var state = states[index];
    //         // $(item).css({
    //         //     'z-index':state.zindex,
    //         //     'width':state.width,
    //         //     'height':state.height,
    //         //     'top':state.top,
    //         //     'left':state.left,
    //         //     'opacity':state.opacity 
    //         // });
    //         $(item).css('z-index', state.zindex).finish().animate(state, 1000);
    //     })
    // }
    // move();

    // function next() {
    //     states.unshift(states.pop());
    //     move();
    // }

    // 原理是将数组中的最后一个元素移动到数组中的第一个元素
    // $('#box .next').click(function () {
    //     // states.unshift(states.pop());
    //     // move();
    //     next();
    // })
    // $('#box .prev').click(function () {
    //     states.push(states.shift());
    //     move();
    // })

    // var time = null;

    // function autopl() {
    //     time = setInterval(function () {
    //         next();
    //     }, 3000)
    // }
    // autopl();

    // $('#box section').add('#box li').hover(function () {
    //     clearInterval(time);
    // }, function () {
    //     autopl();
    // })



})(jQuery)

// 变量的作用域问题
// 1.全局域(window) 
// 2.函数域(function)
// 全局域在页面打开之后到页面关闭之前始终都是存在的，函数域存在于函数被调用的那一刻，闭包除外
// 闭包可以保留函数的作用域，闭包产生的必要条件：函数内部嵌套函数，内层的函数要使用外部函数的变量。全局变量不会产生闭包，全局变量存在于全局域



// 用jQuery封装插件的写法：
// 插件类写法
// $.fn.customFun=function(){自定义插件代码}
// 用法：$('div').customFun()

// 工具类写法  $.ajax
// $.customFun=function(){
// 自定义工具类代码
// }

// 用法：  $.