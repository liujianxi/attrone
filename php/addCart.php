<?php
//加入购物车操作
//1、接收传递过来的POST参数
$productid=intval($_POST['productid']);
//$num=intval($_POST['num']);
//2、准备要添加的购物车数据
//session_start();
//$userid=$_SESSION['memberid'];
try {
    $pdo=new PDO('mysql:host=localhost:3330;dbname=imooc','root','admin',array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
    $pdo->query("set names utf8");
//  $sql="select price from shop_product where id=?";
//  $stmt=$pdo->prepare($sql);
//  $data=$stmt->fetch(PDO::FETCH_ASSOC);
//  var_dump($data);
	$userid='2';
	$price='1000.00';
	$createtime=time();
	//3、完成购物车数据的添加操作(判断当前商品是否存在过)
	$sql="select * from shop_cart where productid =? and userid=?";
	$stmt=$pdo->prepare($sql);
	$stmt->execute(array($productid,$userid));
//	$data=$stmt->fetch(PDO::FETCH_ASSOC);
	$res=$stmt->fetchAll(PDO::FETCH_ASSOC);
//	if($data){//更新
//		$sql="update shop_cart set num=num+? where userid=? and productid=?";
//		$params=array($num,$userid,$productid);
//	}else{//添加
		$sql="insert into shop_cart(productid,num,userid,price,createtime) values(?,?,?,?,?)";
		$params=array($productid,$num,$userid,$price,$createtime);
//	}
//	$stmt=$pdo->prepare($sql);
//	$stmt->execute($params);
	$rows=$stmt->rowCount();
//	print_r($res);
}catch (PDOException $e){
    echo $e->getMessage();
}
//4、返回最终的添加的结果
if($rows){
	$response=array(
		'errno'  =>0,
		'errmsg' =>'success',
		'data'   =>$res,
	);
}else{
	$response=array(
		'errno'  =>-1,
		'errmsg' =>'failed',
		'data'   =>false,
	);
}
echo json_encode($response);