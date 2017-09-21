<?php
header('content-type:text/html;charset=utf-8');
try {
    $option=array(PDO::ATTR_AUTOCOMMIT=>0);
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin',$option);
    echo $pdo->getAttribute(PDO::ATTR_AUTOCOMMIT);
} catch (PDOException $e) {
    echo $e->getMessage();
}