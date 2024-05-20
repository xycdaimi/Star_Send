<?php
//header("Content-type: text/html; charset=utf8");
date_default_timezone_set("Asia/Shanghai");
include 'connect.php';//调用connect.php文件
function zhuce($con)  {
	$uid=$_GET['uid'];
	$zhan=$_GET['zhan'];
	$mima=$_GET['mima'];
	$tel=$_GET['tel'];
	$sql="INSERT INTO `usr`(`uid`, `username`, `password`,`tel`) VALUES ('$uid','$zhan','$mima','$tel');";
 	$res=$con->query($sql);
 	if($res){
    $arr['status'] = 1;
    $arr['info'] = 'success';
	}else{
    $arr['status'] = 0;
    $arr['info'] = 'error';
	}
	echo json_encode($arr);
}
function dindan($con)  {
	$b=$_GET['biao'];
	$biao = json_decode(html_entity_decode(stripslashes($b)), true);
	$ju="select uid from usr where tel = '".$biao['tel1']."'";
	$su="select uid from usr where tel = '".$biao['tel2']."'";
	$res1=$con->query($ju);
	$res2=$con->query($su);
	if($res1/*&&$res2*/){
		$data1=$res1->fetch_all(PDO::FETCH_LAZY);
		$data2=$res2->fetch_all(PDO::FETCH_LAZY);
		$sql="insert into send (订单号, 寄件人uid,寄件人姓名,寄件人地址,寄件人电话,寄件人公司,收件人uid,收件人姓名,收件人地址,收件人电话,收件人公司,物品类型,物品重量,寄件方式,付款方式)values('{$biao['danhao']}','{$data1[0]['uid']}','{$biao['name1']}','{$biao['area1']}','{$biao['tel1']}','{$biao['company1']}','{$data2[0]['uid']}','{$biao['name2']}','{$biao['area2']}','{$biao['tel2']}','{$biao['company2']}','{$biao['type']}','{$biao['weight']}','{$biao['fanshi']}','{$biao['fukuan']}');";
		$res3=$con->query($sql);
		if($res3){
			$arr['status'] = 1;
    		$arr['info'] = 'success';
		}else{
			$arr['status'] = 0;
			$arr['info'] = 'error';
		}
	}else{
		$arr['status'] = 0;
		$arr['info'] = 'error';
	}
	echo json_encode($arr);
}
function change($con) {
	$kuaidi=$_GET['kuaidi'];
	$uid=$_GET['uid'];
	$sql="update usr set kuaidi = ".$kuaidi." where uid = '".$uid."'";
	$res=$con->query($sql);
	if($res){
		$arr['status'] = 1;
    	$arr['info'] = 'success';
	}else{
		$arr['status'] = 0;
		$arr['info'] = 'error';
	}
	echo json_encode($arr);
}
function jiedan($con)  {
	$danhao=$_GET['danhao'];
	$type=$_GET['type'];
	$user=json_decode(html_entity_decode(stripslashes($_GET['userkuai'])), true);
	if($type==1)
		{$sql="update send set 物流状态 = ".$type.", 派件时间= now(), 快递员uid = '".$user['uid']."',快递员电话 = '".$user['tel']."' where 订单号 = '".$danhao."'";}
	else
		{$sql="update send set 物流状态 = ".$type." where 订单号 = '".$danhao."'";}
	$res=$con->query($sql);
	if($res){
		$arr['status'] = 1;
    	$arr['info'] = 'success';
	}else{
		$arr['status'] = 0;
		$arr['info'] = 'error';
	}
	echo json_encode($arr);
}
function qianshou($con) {
	$danhao=$_GET['danhao'];
	$type=$_GET['type'];
	$sql="update send set 物流状态 = ".$type.", 签收时间= now() where 订单号 = '".$danhao."'";
	$res=$con->query($sql);
	if($res){
		$arr['status'] = 1;
    	$arr['info'] = 'success';
	}else{
		$arr['status'] = 0;
		$arr['info'] = 'error';
	}
	echo json_encode($arr);
}
function shan($con) {
	$u=$_GET['uid'];
	$sql="delete from usr where uid = '".$u."'";
	$res=$con->query($sql);
	if($res){
		$arr['status'] = 1;
    	$arr['info'] = 'success';
	}else{
		$arr['status'] = 0;
		$arr['info'] = 'error';
	}
	echo json_encode($arr);
}
function shanchu($con) {
	$danhao=$_GET['danhao'];
	$sql="delete from send where 订单号 = '".$danhao."'";
	$res=$con->query($sql);
	if($res){
		$arr['status'] = 1;
    	$arr['info'] = 'success';
	}else{
		$arr['status'] = 0;
		$arr['info'] = 'error';
	}
	echo json_encode($arr);
}
if ($con->connect_error) {
	die("连接失败：".$con->connect_error);
}
else 
{
	if($_GET['xinxi']=='zhuce'){zhuce($con);}
	else if($_GET['xinxi']=='dindan'){dindan($con);}
	else if($_GET['xinxi']=='change'){change($con);}
	else if($_GET['xinxi']=='jiedan'){jiedan($con);}
	else if($_GET['xinxi']=='qianshou'){qianshou($con);}
	else if($_GET['xinxi']=='shan'){shan($con);}
	else if($_GET['xinxi']=='shanchu'){shanchu($con);}
	die;
}
 
?>