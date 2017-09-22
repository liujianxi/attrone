<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql="insert user(username,password,email) values(?,?,?)";
    $stmt=$pdo->prepare($sql);
    $stmt->bindParam(1,$username);
    $stmt->bindParam(2,$password);
    $stmt->bindParam(3,$email);
    $username='test';
    $password='test';
    $email='test@imooc.com';
    $stmt->execute();
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo $e->getMessage();
}