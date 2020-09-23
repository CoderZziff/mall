$(document).ready(function()
{
    
    var topHeight = $('.shortcut-container').height();
    //获取超出部分高度
    $(window).scroll(function(){
        //固定 页首函数
        var scrollTopValue=$(window).scrollTop();
        //获取页面滚动的高度
        if(scrollTopValue>=topHeight){
            $('.shortcut-container').css({
                position:'fixed',
                top:'0',
                backgroundColor: 'hsla(0, 0%, 100%, 0.75)',
                // 修改CSS样式
            });
        }
        //超过这个高度 修改盒子的POSITION属性 以固定在头部
        else{
            $('.shortcut-container').css({
                position:'static',
                backgroundColor: 'hsla(0, 0%, 0%, 0)',
            });
        }
        //eles 就是相反的
    });
    $('.shortcut-search').click(function(){
        // 这个是头部 站内搜索 那里的点击事件
        $('.search-input-popup').show();
        // 点击就弹出 下下方的推荐搜索
    })
    //点击右侧搜索框 弹出推荐搜索框
    $(document).bind("click",function (e) {
        var target=$(e.target);
        if(target.closest(".dorpdown").length==0&&target.closest(".leftnav").length==0){
            $(".coommondorp").hide();
            $('body').css('background-color','white');
        }
        if(target.closest(".shortcut-search").length==0){
            $(".search-input-popup").hide();
        }
        // 点击的不是自己 就隐藏弹出的自己的内容 并且设置样式
    });
    $('.coommondorp').hide();
    // 下拉框默认隐藏
    $('.leftnav div').click(function(){
        // 点击了头部logo 右边的元素 例如 女装 男装什么的
        var idx=$(this).index();
        // 获取具体点了哪个
        $('.coommondorp').eq(idx).show().siblings('div').hide();
        // 就显示对应的下拉框
        $('body').css('background-color','gray');
        //设置背景颜色 以突出显示
    })
})
