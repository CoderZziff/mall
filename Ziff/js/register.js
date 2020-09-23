$(document).ready(function(){
    //下面的跟注册那个js文件基本一样
    //注释就不打了 看那个就行
    $('.codebottom').click(function () {
        alert("假装你已经拿到了例如：2333");
        $('.codebottom').css('background-color','black'); 
        $('.rigister-bottom').css('background-color','black');
    });
    function cheakPhoneNumber(){
        var userphonenumber=$('#userphonenumber').val();
        var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(!phoneReg.test(userphonenumber))
        {
            $('.phone-erro').show();
            return false;
        }
        else
        {
            $('.phone-erro').hide();
            return true;
        }
    }
    function cheakCode(){
        var usercode=$('#usercode').val();
        if(usercode!="2333")
        {
            $('.code-erro').show();
            return false;
        }
        else{
            $('.code-erro').hide();
            return true;
        }
    }
    $('.rigister-bottom').click(function(){
        cheakPhoneNumber();
        cheakCode();
       if(cheakPhoneNumber()&&cheakCode())
       {
           alert("注册成功");
           $(location).attr("href","../index.html");
       }
    })
})