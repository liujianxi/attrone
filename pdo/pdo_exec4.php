<?php
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin');
    $sql=<<<EOF
        create table if not exists user(
        id int unsigned auto_increment key,
        username varchar(20) not null unique,
        password char(32) not null,
        email varchar(30) not null
        );
EOF;
    $res=$pdo->exec($sql);
    var_dump($res);
    $sql='insert user(username,password,email) values("kings","'.md5('king').'","imooc@qq.com")';
    $res=$pdo->exec($sql);
    echo $res;
} catch (PDOException $e) {
    echo $e->getMessage();
}