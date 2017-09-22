<?php
header('content-type:text/html;charset=utf-8');
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql='select username,password,email from user';
    $stmt=$pdo->prepare($sql);
    $stmt->execute();
    echo '结果集中的列数一共有:'.$stmt->columnCount();//列数总数
    echo '<br/>';
    $stmt->bindColumn(1, $username);//绑定一列到PHP变量中
    $stmt->bindColumn(2, $password);
    $stmt->bindColumn(3, $email);
    while($stmt->fetch(PDO::FETCH_BOUND)){
        echo '用户名:'.$username.'-密码:'.$password.'-邮箱:'.$email.'<hr/>';
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}