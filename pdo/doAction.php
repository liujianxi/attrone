<?php
header('content-type:text/html;charset=utf-8');
$username=$_POST['username'];
$password=$_POST['password'];
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $username=$pdo->quote($username);
    $sql="select * from user where username={$username} and password='{$password}'";
    echo $sql;
    $stmt=$pdo->query($sql);
    //结果集中的记录的条数
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo $e->getMessage();
}