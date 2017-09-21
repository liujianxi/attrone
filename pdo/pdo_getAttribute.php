<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    echo '自动提交'. $pdo->getAttribute(PDO::ATTR_AUTOCOMMIT);
    echo '<br/>';
    $attrArr=array(
        'AUTOCOMMIT','ERRMODE','CASE','PERSISTENT','TIMEOUT','ORACLE_NULLS',
        'SERVER_INFO','SERVER_VERSION','CLIENT_VERSION','CONNECTION_STATUS'
    );
    foreach ($attrArr as $attr){
        echo "PDO::ATTR_$attr:";
        echo $pdo->getAttribute(constant("PDO::ATTR_$attr")),'<br/>';
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}