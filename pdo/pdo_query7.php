<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql='select * from user where id=2';
    $stmt=$pdo->query($sql);
    //var_dump($stmt);
    foreach ($stmt as $row){
        print_r($row);
        echo '<hr/>';
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}