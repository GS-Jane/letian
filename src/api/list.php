<?php 
    require('connect.php');

     $result = $conn->query('select * from commodity');

     $pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
     $qty = isset($_GET['qty']) ? $_GET['qty'] : 8;

    $row = $result->fetch_all(MYSQLI_ASSOC);
     $res = array(
        'data' =>array_slice ($row,($pageNo-1)*$qty,$qty),
        'qty' =>$qty,
        'total' =>count($row)
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>