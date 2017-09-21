<?php
try {
    $dsn='imooc';
    $username='root';
    $passwd='admin';
    $pdo=new PDO($dsn,$username,$passwd);
    var_dump($pdo);
} catch (PDOException $e) {
    echo  $e->getMessage();
}