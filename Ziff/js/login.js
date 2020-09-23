$(document).ready(function(){
    $('.codebottom').click(function () {
        alert("假装你已经拿到了例如：2333");
        // 给获取验证码按钮添加点击事件 假装弹了一个验证码：2333
        $('.codebottom').css('background-color','black'); 
        $('.loginbottom').css('background-color','black');
        // 上面2个 给2个按钮换CSS样式 换成黑色
    });
    // 下面是验证模块
    function cheakPhoneNumber(){
        var userphonenumber=$('#userphonenumber').val();
        // 获取当前手机号input内的数据
        var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
        // 设置正则表达式的格式
        if(!phoneReg.test(userphonenumber))
        // 如果输入的数据不对
        {
            $('.phone-erro').show();
            return false;
            //手机号码错误的DIV盒子就显示
        }
        else
        {
            $('.phone-erro').hide();
            return true;
        }
    }
    function cheakCode(){
        var usercode=$('#usercode').val();
        // 获取当前验证码input内的数据
        if(usercode!="2333")
        // 如果不是2333
        {
            $('.code-erro').show();
            return false;
        }
        else{
            $('.code-erro').hide();
            return true;
        }
        // 跟手机号的验证差不多
    }
    $('.loginbottom').click(function(){
        // 给登录按钮添加点击事件
        cheakPhoneNumber();
        cheakCode();
        // 上面2个函数先运行一遍 以免下面if的时候有可能2个都是错的
        // 但是因为程序流程问题 if第一个判断为false就停了
        // 那后面也是错的就不会执行 也就不会弹出错误框
       if(cheakPhoneNumber()&&cheakCode())
        {
            alert("登录成功");
            $(location).attr('href', '../index.html');
            //都对了弹出登录成过 然后跳转到主页
        }
    })
    $('.jump-registered').click(function () { 
        $(location).attr('href', 'register.html');
    });
    // 给新用户注册添加点击事件 点击就跳转到注册界面
})