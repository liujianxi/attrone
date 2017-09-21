<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql='select * from user where username="king1"';
    //准备SQL语句
    $stmt=$pdo->prepare($sql);
    //执行预处理语句
    $res=$stmt->execute();
    //得到结果集中的一条记录
    $row=$stmt->fetch();
    print_r($row);
} catch (PDOException $e) {
    echo $e->getMessage();
}