<?php
header('content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');  
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
	$desc=$_POST['desc'];
	$title=$_POST['title'];
	$tag=$_POST['tag'];
	$createtime=time();
	try{
		$pdo=new PDO('mysql:host=sdm225894292.my3w.com;dbname=sdm225894292_db','sdm225894292','liujianxi199419',array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
		$pdo->query("set names utf8");
		$sql="insert textlist(textCreateTime,textDesc,textTitle,tagName) values(?,?,?,?)";
		$params=array($createtime,$desc,$title,$tag);
		$stmt=$pdo->prepare($sql);
		$stmt->execute($params);
		$rows=$stmt->rowCount();
	}catch(PDOException $e){
		echo $e->getMessage();
	}
	if($rows){
		$response=array(
			'errorCode'=>0,
			'msg'=>'success',
		);
	}else{
		$response=array(
			'errorCode'=>-1,
			'msg'=>'fail',
		);
	};
//	//4、返回最终的添加的结果
	echo json_encode($response);