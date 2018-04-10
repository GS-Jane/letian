<?php

require('connect.php');

$username = isset($_GET['username']) ? $_GET['username'] :null;
$password = isset($_GET['password']) ? $_GET['password'] :null;
$type = isset($_GET['type']) ? $_GET['type'] :null;

// 查找数据库判断用户名是否存在
$sql = "select username from reg where username='$username'";

$result = $conn->query($sql);

//若是存在则成功--条件一
if($result->num_rows>0){

    if($type ==='reg'){
        //解密=密码 md5(str)--条件二
         $password=md5($password);

    echo "success";
    }
}else{
    
        echo "fail";
    }



?>