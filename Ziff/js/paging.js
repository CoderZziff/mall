$(document).ready(function()
{   
    $('.order-inner a').eq(0).addClass('order-current').siblings('a').removeClass('order-current');
    $('.order-inner a').click(function(){
        $(this).addClass('order-current').siblings('a').removeClass('order-current');
    })
    // 上面设置默认样式
    $('.showPic').children('a').click(function(){
        var picIndex=$(this).index();
        $(this).addClass('currentcolor').siblings('a').removeClass('currentcolor');
        $(this).parent('.showPic').siblings('.reconmmend-images').children('a').eq(picIndex).show().siblings('a').hide();
        // 给所有的色块都添加点击事件
        // 点击了色块就寻找它对应父节点
        // 下面的对应图显示
        // 其他不是这个色块对应的图隐藏
    })
    $('.reconmmend-body .reconmmend-body-inner .reconmmend-images a').eq(0).show().siblings('a').hide();
    // 默认显示每一个展品的第一张图
    $('.component li').mouseenter(function(){
        $(this).addClass('current');
    })
    // 鼠标进入 那个分类栏 就是women men那里 添加css样式
    $('.component li').mouseleave(function(){
        $(this).removeClass('current');
    })
    // 离开移除
})