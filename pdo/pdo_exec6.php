<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $pdo->query("set names utf8mb4");
    $sql='update user set username="阿西" where id=1';
    $res=$pdo->exec($sql);//受影响的记录的条数
    echo $res.'条记录被影响';
    echo '最后插入的ID为:'.$pdo->lastInsertId();
} catch (PDOException $e) {
    echo $e->getMessage();
}