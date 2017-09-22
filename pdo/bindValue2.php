<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql="insert user(username,password,email) values(:username,:password,:email)";
    $stmt=$pdo->prepare($sql);
    $username='imooc_king22';
    $password='imooc_king22';
    $stmt->bindValue(':username', $username);
    $stmt->bindValue(':password', $password);
    $stmt->bindValue(':email', 'imooc22@imooc.com');
    $stmt->execute();
    echo $stmt->rowCount();
    $username='imooc_king33';
    $password='imooc_king33';
    $stmt->bindValue(':username', $username);
    $stmt->bindValue(':password', $password);
    $stmt->execute();
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo $e->getMessage();
}