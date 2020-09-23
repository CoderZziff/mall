$(document).ready(function(){
    $('.inbox .group').eq(0).show().siblings('.group').hide();

    $('.sidebar-list a').click(function(){
        var sidebarIndex=$(this).index();
        $('.inbox .group').eq(sidebarIndex).show().siblings('.group').hide();
    })
    // 点击位置的不同 显示对应的内容
})