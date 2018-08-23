var states = [{
        zindex: 1,
        width: 150,
        height: 122,
        top: 70,
        left: 120,
        opacity: 0.2
    },
    {
        zindex: 2,
        width: 170,
        height: 140,
        top: 60,
        left: 0,
        opacity: 0.4
    },
    {
        zindex: 3,
        width: 190,
        height: 160,
        top: 50,
        left: 122,
        opacity: 0.8
    },
    {
        zindex: 4,
        width: 210,
        height: 180,
        top: 40,
        left: 245,
        opacity: 1
    },
    {
        zindex: 3,
        width: 190,
        height: 160,
        top: 50,
        left: 387,
        opacity: 0.8
    },
    {
        zindex: 2,
        width: 170,
        height: 140,
        top: 60,
        left: 530,
        opacity: 0.4
    },
    {
        zindex: 1,
        width: 150,
        height: 120,
        top: 70,
        left: 420,
        opacity: 0.2
    }
];

var lis = $('#box li');

function move() {
    lis.each(function (index, item) {
        console.log(item);
        var state = states[index];
        // $(item).css({
        //     'z-index':state.zindex,
        //     'width':state.width,
        //     'height':state.height,
        //     'top':state.top,
        //     'left':state.left,
        //     'opacity':state.opacity 
        // });
        $(item).css('z-index', state.zindex).finish().animate(state, 1000);
    })
}
move();


function next(){
    states.unshift(states.pop());
    move();
}

// 原理是将数组中的最后一个元素移动到数组中的第一个元素
$('#box .next').click(function () {
    // states.unshift(states.pop());
    // move();
    next();
})
$('#box .prev').click(function () {
    states.push(states.shift());
    move();
})

var time=null;
function autopl(){
    time=setInterval(function(){
        next();
    },3000)
}
autopl();

$('#box section').add('#box li').hover(function(){
    clearInterval(time);
},function(){
    autopl();
})