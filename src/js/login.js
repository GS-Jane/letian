;
require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            //头部引入
            $('#head').load('../html/head.html');
            //尾部引入
            $('#foot').load('../html/foot.html');
            
            $('.btn').on('click',function(){
                if($('#username').val().trim() =='' || $('#password').val()==''){
                        alert('账号密码不能为空');
                        return;
                }else{
                    $.ajax({
                        url:'../api/login.php',
                        data:{
                            username:$('#username').val(),
                            password:$('#password').val(),
                            type:'reg'
                        },
                        success:function(data){
                            console.log(data)
                            if(data =='success'){
                                location.href = '../../index.html';
                            }else{
                               alert('请输入正确的账号和密码')
                            }
                        }
                    })
                    
                }
            })



        })
    })
})