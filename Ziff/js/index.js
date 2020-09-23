$(document).ready(function()
{
    /*动态生成图片索引*/
    for(var i=0;i<$('.switch-list li').children().length;i++){
        /*获取当前有多少张图片就在下方生产多少个索引*/
        var a_first='<a href="javascript:;" index="'
        var index=i;
        var a_end='"></a>'
        //拼接字符串添加下标信息
        $('.focus').append(a_first+index+a_end);
    }
    $('.focus a').eq(0).addClass('focus-current').siblings('a').removeClass('focus-current');
    var swichImgIndex=0;
    var circle=0;
    //当前播放图片的索引变量
    var movewidth=$('.switch-list li').width();
    //移动距离是图片的宽度
    $('.focus a').click(function () { 
        $(this).addClass('focus-current').siblings('a').removeClass('focus-current');
        //给索引图标设置点击事件，并且记录点的是哪张图片
        swichImgIndex=$(this).attr("index");
        //点击时把索引图标的index属性值拿过来 赋值给控制当前播放图片的变量swichImgIndex
        circle=swichImgIndex;
        //记录这个下标
        $('.switch-list').animate({left:-1*swichImgIndex*movewidth},"slow");
        // 移动距离为当前的图片下标乘以单张图片的宽度再取负
    });

    var clonefirst=$('.switch-list li').eq(0).clone(true);
    $('.switch-list').append(clonefirst);
    // 克隆第一张图片 插到最后 用这个来实现无缝切换
    $('.arrowright').click(function(){
        if(swichImgIndex==$('.switch-list').children().length-1)
        {
            $('.switch-list').css('left','0');
            swichImgIndex=0;
            // 点击了右按钮 检测当前索引是否为列表的最大索引 是的话 索引重置为0
        }
        swichImgIndex++;
        // 右按钮点击之后 索引+1
        $('.switch-list').animate({left:-1*swichImgIndex*movewidth},"slow");
        //播放动画 向左移动图片队列 移动距离是当前的索引*每张图片的宽度
        circle++;
        if(circle==$('.focus').children().length)
        {
            circle=0;
        }
        $('.focus a').eq(circle).addClass('focus-current').siblings('a').removeClass('focus-current');
    })
    $('.arrowleft').click(function(){
        //这个是左按钮 跟上面那个相反
        if(swichImgIndex==0)
        {   
            swichImgIndex=$('.switch-list li').children().length-1;
            var leftwidth=-swichImgIndex*movewidth;
            $('.switch-list').css('left',leftwidth);
        
        }
        swichImgIndex--;
        $('.switch-list').animate({left:-1*swichImgIndex*movewidth},"slow");
        circle--;
        if(circle<0)
        {
            circle=$('.focus').children().length-1;
        }
        $('.focus a').eq(circle).addClass('focus-current').siblings('a').removeClass('focus-current');
    })
    //轮播
    var timer=setInterval(function(){
        $('.arrowright').click();
    },2000)
    // 设置定时器 自动调用右键点击函数
    $('.swiper-slide-wrapper').mouseenter(function() {
        clearInterval(timer);
        timer=null;
        // 如果鼠标放在大图上 就清除这个定时器
    });
    function opentimer(){
        timer=setInterval(function(){
            $('.arrowright').click();
        },2000)
    }
    $('.swiper-slide-wrapper').mouseleave(function() {
        opentimer();
        // 鼠标离开 就重新开始定时器
    })

    // 下面的都是瀑布流算法
    function minDiv(){
        var waterfall_1=$('.item').eq(0).children();
        var waterfall_2=$('.item').eq(1).children();
        var waterfall_3=$('.item').eq(2).children();
        var waterfall_4=$('.item').eq(3).children();
        // 获取每一个流下的子节点
        var waterfallHeight_1=calculatedHeight(waterfall_1);
        var waterfallHeight_2=calculatedHeight(waterfall_2);
        var waterfallHeight_3=calculatedHeight(waterfall_3);
        var waterfallHeight_4=calculatedHeight(waterfall_4);
        // 调用计算高度的函数计算每一个流的高度
        var minHeight=Math.min(waterfallHeight_1,waterfallHeight_2,waterfallHeight_3,waterfallHeight_4);
        // 计算其中高度最小的一个流
        Mdiv= calculatedMinHeight(minHeight);
        function calculatedMinHeight(minHeight) {
            switch(minHeight){
                case waterfallHeight_1:
                    return $('.item').eq(0);
                case waterfallHeight_2:
                    return $('.item').eq(1);
                case waterfallHeight_3:
                    return $('.item').eq(2);
                case waterfallHeight_4:
                    return $('.item').eq(3);
            }
            // 传入最小的流 并且与所有的流比对 把最小的瀑布流对应的item父盒子传出来
        }
        
    }
    function calculatedHeight(waterfallImgs){
        if(waterfallImgs==null||waterfallImgs.length==0)
        {
            // 如果传入的瀑布流内没有子节点
            return 0;
            // 则返回对应高度0
        }
        else
        {
            var height=0;
            for(var i=0;i<waterfallImgs.length;i++)
            {
                var img=waterfallImgs.eq(i);
                var h=img.height();
                height+=h;
            }
            return height;
            // 如果里面有子节点 就遍历每一个子节点 然后把所有子节点的高度累加 最后返回
        }
    }
    var insertImg=function(){
        var inter=setInterval(function(){
            if(document.documentElement.scrollHeight>windowHeight)
            {
                clearInterval(inter);
                // 如果当前文档高度大于预定高度
                // 就清除定时器不再加载图片
            }
            minDiv();
            imgIndex++;
            if(imgIndex>20)
            {
                imgIndex=1;
            }
            $(Mdiv).append("<img src='images/index/"+imgIndex+".jpg'>");
        },200)
        // 如果文档高度小于等于已浏览的内容高度
        // 就开始定时器 往对应的瀑布流内插入图片
    }
    var Mdiv='';
    var imgIndex=0;
    var windowHeight=window.screen.height+600;
    // 预定高度默认设置为一个屏幕的高度+600像素
    insertImg();
    // 默认执行首次插图函数
    $(document).scroll(function(){
        var scroH = $(document).scrollTop();  //滚动高度
        var viewH = $(window).height();  //可见高度 
        var contentH = $(document).height();  //内容高度

        if(contentH<=(scroH+viewH)){
            //滚动条滚到底了
            windowHeight+=600;
            //把预定高度累加600
            insertImg();
            // 重新执行插图函数
        }
    })
    $('.item').click(function(){
        $(location).attr("href","html/women-outer.html");
        //点击跳转
    })
})
