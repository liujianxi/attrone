<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql='delete user15 set username="king" where id=1';
    $res=$pdo->exec($sql);//受影响的记录的条数
    if($res===false){
        echo $pdo->errorCode();
        echo '<hr/>';
        $errInfo=$pdo->errorInfo();
        print_r($errInfo);
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}