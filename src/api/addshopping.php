<?php 
    require('connect.php');

    //获取前端数据
    $c_id = isset($_GET['c_id']) ? $_GET['c_id'] : null;
    $img = isset($_GET['img']) ? $_GET['img'] : null;
    $ys1 = isset($_GET['ys1']) ? $_GET['ys1'] : null;
    $ys2 = isset($_GET['ys2']) ? $_GET['ys2'] : null;
    $ys_h1 = isset($_GET['ys_h1']) ? $_GET['ys_h1'] : null;
    $price_2 = isset($_GET['price_2']) ? $_GET['price_2'] : null;
    $qty_txt = isset($_GET['qty_txt']) ? $_GET['qty_txt'] : null;
  
    $sql = "select c_id from shopping where c_id='$c_id'";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        //判断如果数据库存在这个商品，则加1
        $sql = "update shopping set qty='$qty_txt'+qty where c_id='$c_id'";

        // 执行sql语句
        $res = $conn->query($sql);
        // if($res){
        //     echo "you_ok";
        // }else{
        //     echo "you_error";
        // }
        echo "success";
    }else{
        // 加入购物车（保存到数据库）
        $sql = "insert into shopping(c_id,imgs,name,shorthand,englishname,price,qty) values('$c_id','$img','$ys1','$ys2 ','$ys_h1','$price_2 ','$qty_txt')";

        // 执行sql语句
        $res = $conn->query($sql);

        // if($res){
        //     echo "wu_error";
        // }else{
        //     echo "wu_ok";
        // }
        echo "fail";
    }


?>