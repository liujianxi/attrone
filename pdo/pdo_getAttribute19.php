<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    echo '自动提交'. $pdo->getAttribute(PDO::ATTR_AUTOCOMMIT);
    echo '<br/>';
    echo 'PDO默认的错误处理模式：'.$pdo->getAttribute(PDO::ATTR_ERRMODE);
    $pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
    echo '<br/>';
    echo '自动提交'. $pdo->getAttribute(PDO::ATTR_AUTOCOMMIT);
} catch (PDOException $e) {
    echo $e->getMessage();
}