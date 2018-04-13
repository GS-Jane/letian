<?php 
        require('connect.php');

        $id = isset($_GET['id']) ? $_GET['id'] : null;
        $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
        $sql = "update shopping as c set c.qty = '$qty' where c.id = '$id'";
            $res = $conn->query($sql);
            // var_dump($res);
            if($res){
                $uSQL = "select * from shopping as c where c.id = '$id'";
                $uRes = $conn->query($uSQL)->fetch_all(MYSQLI_ASSOC);
                    // echo $username;
                echo json_encode($uRes,JSON_UNESCAPED_UNICODE);
            }

?>