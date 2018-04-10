<?php

require('connect.php');

$username = isset($_GET['username']) ? $_GET['username'] :null;
$password = isset($_GET['password']) ? $_GET['password'] :null;
$type = isset($_GET['type']) ? $_GET['type'] :null;

// 查找数据库判断用户名是否存在

$sql = "select username from reg where username='$username'";

$result = $conn->query($sql);

if($result->num_rows>0){

    echo "fail";
}else{
    if($type ==='reg'){
        //加密密码 md5(str)
        $password = md5($password);

        //注册保存到数据库
        $sql = "insert into reg(username,password) values('$username','$password')";

        //执行sql语句
        $res = $conn->query($sql);

            if($res){
                echo "success";
            }else{
                echo "fail";
            }
        
    }else{
        echo "success";
    }
}




?>