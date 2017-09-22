<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql="insert user(username,password,email) values(:username,:password,:email)";
    $stmt=$pdo->prepare($sql);
    $stmt->bindParam(":username",$username,PDO::PARAM_STR);
    $stmt->bindParam(":password",$password,PDO::PARAM_STR);
    $stmt->bindParam(":email",$email,PDO::PARAM_STR);
    $username='imooc1';
    $password='imooc1';
    $email='imooc1@imooc.com';
    $stmt->execute();
    $username='mr.king1';
    $password='mr.king1';
    $email='mr.king1@imooc.com';
    $stmt->execute();
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo $e->getMessage();
}