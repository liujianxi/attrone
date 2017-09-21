<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
//     $sql=<<<EOF
//     insert user(username,password,email) values("king1","king1","imooc1@qq.com"),
//     ("king2","king2","imooc2@qq.com"),
//     ("king3","king3","imooc3@qq.com")
// EOF;
    $sql='insert user(username,password,email) values("king9","king9","imooc9@qq.com")';
    $res=$pdo->exec($sql);
    echo '受影响的记录条数为:'.$res,'<br/>';
    echo '最后插入的ID为:'.$pdo->lastInsertId();
} catch (PDOException $e) {
    echo $e->getMessage();
}