<?php
header('content-type:text/html;charset=utf-8');
try {
    $option=array(PDO::ATTR_AUTOCOMMIT,0);
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin',$option);
    //开启事务
    $pdo->beginTransaction();
    $sql='update userAccount set money=money-100 where username ="imooc"';
    $res1=$pdo->exec($sql);
    if($res1==0){
        throw new PDOException('imooc 转账失败');
    }
    $res2=$pdo->exec('update userAccount set money=money+100 where username="king"');
    if($res2==0){
        throw new PDOException('king 接收失败');
    }
    $pdo->commit();
} catch (PDOException $e) {
    $pdo->rollBack();
    echo $e->getMessage();
}