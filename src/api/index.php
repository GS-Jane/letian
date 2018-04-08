<?php 
    require('connect.php');

     $result = $conn->query('select * from commodity');

     $row = $result->fetch_all(MYSQLI_ASSOC);


    echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>