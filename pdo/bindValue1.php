<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql="insert user(username,password,email) values(?,?,?)";
    $stmt=$pdo->prepare($sql);
    $username='imooc_king';
    $password='imooc_king';
    $stmt->bindValue(1, $username);
    $stmt->bindValue(2, $password);
    $stmt->bindValue(3, 'imooc@imooc.com');
    $stmt->execute();
    echo $stmt->rowCount();
    $username='imooc_king1';
    $password='imooc_king1';
    $stmt->bindValue(1, $username);
    $stmt->bindValue(2, $password);
    $stmt->execute();
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo $e->getMessage();
}