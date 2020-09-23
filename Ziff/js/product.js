$(document).ready(function()
{
    var productIndex=0;
    //当前图片索引
    var imgAddress='';
    function changeImgAddress(){
        imgAddress=$('.picture-viewer-small-picture li').eq(productIndex).html();
        //获取当前小图片的地址
        $('.picture-viewer-picture-inner li').html(imgAddress);
        $('.picture-viewer-overlay-picture li').html(imgAddress);
        //把小图的地址赋给中图还有放大图
    }
    function productIndexAdd() { 
        if(productIndex>$('.picture-viewer-small-picture li').children().length-1)
        {
            productIndex=0;
            //索引增加超过图片数量，重置索引为0；
        }
        $('.picture-viewer-small-picture li').eq(productIndex).addClass('current-picture-viewer-small-picture').siblings('li').removeClass('current-picture-viewer-small-picture');
        //给当前的小图片添加样式边框
        changeImgAddress();
    }
    function productIndexMinus() { 
        //这个是减的函数 原理跟上面一样；
        if(productIndex<0)
        {
            productIndex=$('.picture-viewer-small-picture li').children().length-1;
        }
        $('.picture-viewer-small-picture li').eq(productIndex).addClass('current-picture-viewer-small-picture').siblings('li').removeClass('current-picture-viewer-small-picture');
        changeImgAddress();
    }
    changeImgAddress();
    $('.picture-viewer-small-picture li').eq(0).addClass('current-picture-viewer-small-picture');
    //给第一个小图添加边框样式，移除他的兄弟这个样式
    $('.picture-viewer-overlay-picture li').hide();
    //默认隐藏大图
    $('.scroll-button-up').click(function(){
        productIndex--;
        productIndexMinus();
        //点击上按钮 图片索引减1 调用减法函数
    })
    $('.scroll-button-left').click(function(){
        productIndex--;
        productIndexMinus();
        //点击左按钮 图片索引减1 调用减法函数
    })
    $('.scroll-button-down').click(function(){
        productIndex++;
        productIndexAdd();
        //点击下按钮 图片索引加1 调用加法函数
    })
    $('.scroll-button-right').click(function(){
        productIndex++;
        productIndexAdd();
        //点击右按钮 图片索引加1 调用加法函数
    })
    $('.picture-viewer-small-picture li').mouseenter(function(){
        productIndex=$(this).index();
        //鼠标移入小图片时 获取当前移入的图片的索引
        $('.picture-viewer-small-picture li').eq(productIndex).addClass('current-picture-viewer-small-picture').siblings('li').removeClass('current-picture-viewer-small-picture');
        // 给当前移入的图片添加边框样式
        $('.picture-viewer-picture-inner li').show();
        changeImgAddress();
    })
    $('.shadowbox').hide();
    //默认放大镜框框隐藏
    $('.picture-viewer-picture-inner').mouseenter(function(){
        $('.picture-viewer-overlay-picture li').show()
        $('.shadowbox').show();
        // 移入中间的图片 放大镜框展示 右侧的大图也展示
    })
    $('.picture-viewer-picture-inner').mouseleave(function(){
        $('.picture-viewer-overlay-picture li').hide();
        $('.shadowbox').hide();
        //这就没什么好说的 跟上面那个相反
    })
    $('.picture-viewer-picture-inner').mousemove(function(e){
        e = e || window.event;
        e.stopPropagation() //阻止冒泡
        var Xoffset=e.pageX-$('.shadowbox').innerWidth()/2-130-$('.product-detail').offset().left;
        // 这个变量用来计算当前鼠标在中间图里面的x坐标位置 鼠标在中间图里面的x坐标=当前鼠标在页面x的坐标-阴影盒子的宽度的一半-它左边的盒子的宽度-外面盒子距离最左边的宽度
        var Yoffset=e.pageY-$('.shadowbox').height()/2-125;
        // 因为Y轴没有自动居中啊什么的 所以当前鼠标在中间图里面的Y坐标位置 就是这个坐标就等于鼠标Y轴减盒子高度的一般-头上盒子的高度
        var MaxTopoffset=$('.picture-viewer-picture-inner').height()-$('.shadowbox').height();
        var MaxLeftoffset=$('.picture-viewer-picture-inner').width()-$('.shadowbox').width();
        // 阴影盒子最大可移动距离是他的父盒子-阴影盒子的宽高
        //可以移动的最大范围
        console.log('Yoffset='+Yoffset);
        console.log('Xoffset='+Xoffset);
        //限定边界
        if(Xoffset<0)
        {
            Xoffset=0;
            // 向左拖的时候 父盒子减子盒子的距离小于0，就定在0，限定左边界
        }
        if(Xoffset>MaxLeftoffset)
        {
            Xoffset=MaxLeftoffset;
            // 向左拖的时候 父盒子减子盒子的距离大于最大拖动宽度，就定在最大拖动宽度，限定右边界
        }
        if(Yoffset<0)
        {
            Yoffset=0;
        }
        if(Yoffset>MaxTopoffset)
        {
            Yoffset=MaxTopoffset;
        }
        // 上面是上下的 跟左右同理
        $('.shadowbox').css("left",Xoffset+"px").css("top",Yoffset+"px");
        //根据上面计算的变量 修改阴影盒子的位置 实现跟踪鼠标
        var bigImgXOffset=-Xoffset/$('.picture-viewer-picture-inner').width();
        //这个变量是控制放大图的移动位置 它的移动位置=当前阴影盒子的X的位置/他父盒子的宽度
        var bigImgYOffset=-Yoffset/$('.picture-viewer-picture-inner').height();
        //同理 方向不同
        $('.picture-viewer-overlay-picture li img').css("transform","translate(" + bigImgXOffset*100 + "%," + bigImgYOffset*100 + "%)");
        // 修改放大图的transform：translate属性以实现移动图片
        console.log(bigImgXOffset);
        console.log(bigImgYOffset);
    })
    $('.S-button').eq(0).addClass('current-button');
    // 这个是尺码按钮 给第一个添加默认边框
    $('.S-button').click(function(){
        var text=$(this).html();
        var buttonIndex=$(this).index();
        // 获取按钮上的文本内容
        $('.S-button').eq(buttonIndex).addClass('current-button').siblings('.S-button').removeClass('current-button');
        //点击哪个按钮就给他添加样式 给他的兄弟元素移除这个样式
        $('.product-size P').html(text);
        //改变按钮上面那个尺码文本段的内容
    })
    $('.count-miuns').click(function(){
        var value=$('.count input').attr("value");
        value--;
        if(value<1)
        {
            value=1;
        }
        $('.count input').attr("value",value);
    })
    $('.count-add').click(function(){
        var value=$('.count input').attr("value");
        value++;
        $('.count input').attr("value",value);
    })
    // 数量的加减按钮 没什么好说的

})