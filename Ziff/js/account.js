$(document).ready(function()
{   
    $('.order-inner a').eq(0).addClass('order-current').siblings('a').removeClass('order-current');
    // 默认显示第一个列表 这个体现在order-list.html这个页面
    $('.order-inner a').click(function(){
        $(this).addClass('order-current').siblings('a').removeClass('order-current');
    // 点击这个列表之后 给它添加底部边框
    })

    // 下面的是点击不同的款式色块 上面展示的大图 展示对应的图片
    $('.showPic').children('a').click(function(){
        // 给色块添加点击事件
        var picIndex=$(this).index();
        // 获取点击的色块在它所在的列表内的索引
        $(this).parent('.showPic').siblings('.reconmmend-images').children('a').eq(picIndex).show().siblings('a').hide();
        // 先找到它的父节点再找到父节点的兄弟节点里面的a节点，用刚刚获取的索引坐标显示对应的大图，其他不是这个索引的就隐藏。
        $(this).addClass('currentcolor').siblings('a').removeClass('currentcolor');
        // 给当前点击的色块添加一个黑色边框
    })
})