<?php
try{
    $dsn="mysql:host=localhost:3330;dbname=shopimooc";
    $username='root';
    $passwd='admin';
    $pdo=new PDO($dsn,$username,$passwd);
    var_dump($pdo);
}catch (PDOException $e){
    echo $e->getMessage();
}