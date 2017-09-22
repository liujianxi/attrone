<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql="DELETE FROM user WHERE id<:id";
    $stmt=$pdo->prepare($sql);
    $stmt->bindParam(":id",$id);
    $id=10;
    $stmt->execute();
    echo $stmt->rowCount();
} catch (PDOException $e) {
    echo $e->getMessage();
}