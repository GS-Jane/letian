<?php 
    //购物车删除接口
    require('./connect.php');

    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $del = isset($_GET['del']) ? $_GET['del'] : null;
    if($del == 'del'){
        $sql = "DELETE FROM shopping where id='$id'";
        $res = $conn->query($sql);
        // var_dump($res);
    }else{
        $sql = "DELETE FROM shopping";
        $res = $conn->query($sql);
    }
    

?>