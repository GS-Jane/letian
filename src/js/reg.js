;
require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            //头部引入
            $('#head').load('../html/head.html');
            //尾部引入
            $('#foot').load('../html/foot.html');


            //随机生成验证码
            var arr = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $('.reg3_y').on('click',function(){
                $('.reg3_y')[0].innerText = pan();
            })
                $('.reg3_y')[0].innerText = pan();
                function pan(){
                    var res = '';
                    for(var i=0;i<4;i++){
                        var idx = parseInt(Math.random()*arr.length);

                        res+=arr[idx];
                    }
                    return res;
                }

                //验证用户名是否已经存在
                
                $('#username')[0].onblur = function(){
                    let _username = username.value;
                    $.ajax({
                        url:"../api/reg.php",
                        data:{username:_username},
                        success:function(data){
                            if(data==='success'){
                                $('.yhm')[0].innerText = '';
                            }else{

                                $('.yhm')[0].innerText = '此用户已被注册';
                            }
                        }
                    })
                }

            //注册
            $('.btn').on('click',function(){
                 //判断
                if($('#username')[0].value ==''&& $('#password')[0].value==''){
                    alert('不能为空');
                    return false;
                }

                var reg = /^1[34578]\d{9}$/g;
                if(!reg.test($('#username').val())){
                     alert('账号必须为电话号码');
                    $('#username').focus();
                    return false;
                }
                if(!$('#password').val()){
                    $('#password').focus();
                    alert('请输入密码');
                    return false;
                }
                if(!/^[a-z0-9\-]{5,16}$/.test($('#password').val())){
                    alert('请输入6-16位密码'); 
                    return false;
                }
                if($('#yzm')[0].value != $('.reg3_y')[0].innerText){
                    alert('请输入正确验证码');
                    return false;
                }
                $.ajax({
                    url:"../api/reg.php",
                    data:{
                        username:$('#username').val(),
                        password:$('#password').val(),
                        type:'reg'
                    },
                    success:function(data){
                        console.log(data)
                        if(data ==='success'){
                             location.href = 'login.html';
                        }else{
                            alert('此电话号码以被注册')
                        }
                    }
                })
               
             
                
            })
            
            
        })
    })
})