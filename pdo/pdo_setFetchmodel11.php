<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql='select * from user';
    //准备SQL语句
    $stmt=$pdo->prepare($sql);
    //执行预处理语句
    $res=$stmt->execute();
//     if($res){
//         while($row=$stmt->fetch(PDO::FETCH_OBJ)){
//             print_r($row);
//             echo '<hr/>';
//         }
//     }
//     $rows=$stmt->fetchAll(PDO::FETCH_ASSOC);
//     print_r($rows);
      $stmt->setFetchMode(PDO::FETCH_ASSOC);
      $rows=$stmt->fetchAll();
      print_r($rows);
} catch (PDOException $e) {
    echo $e->getMessage();
}