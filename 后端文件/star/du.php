<?php
//header("Content-type: text/html; charset=utf8");
include 'connect.php';//调用connect.php文件

function zhuce($con)  {
	$zhan=$_GET['zhan'];
	$tel=$_GET['tel'];
	$sql="select COUNT(username) as flag from usr where username = '".$zhan."' or tel = '".$tel."'";//根据传入的参数查询数据库中的数据
 	$res=$con->query($sql);
 	//echo $con->error;
 	//print_r($res->fetch_all (MYSQLI_BOTH));
 	if ($res){
 		$data=$res->fetch_all(PDO::FETCH_LAZY);
 	}
 	else{
    	echo '查询出错！';
    }
  //fetch_all查询所有行
  
 	echo json_encode($data);//返回二维数组形式的值供小程序端用 
}
function denglu($con)  {
	$zhan=$_GET['zhan'];
	$mima=$_GET['mima'];
	$sql="select COUNT(username) as flag from usr where (username = '".$zhan."' or tel = '".$zhan."') and password = '".$mima."'";//根据传入的参数查询数据库中的数据
 	$res=$con->query($sql);
 	//echo $con->error;
 	//print_r($res->fetch_all (MYSQLI_BOTH));
 	if ($res){
 		$data=$res->fetch_all(PDO::FETCH_LAZY);
 	}
 	else{
    	echo '查询出错！';
    }
  //fetch_all查询所有行
  if($data[0]['flag']==1){
	$sq="select username,password,uid,tel,kuaidi from usr where (username = '".$zhan."' or tel = '".$zhan."') and password = '".$mima."'";
	$res=$con->query($sq);
	if ($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
		$data[0]['flag']=1;
	}
	else{
	   echo '查询出错！';
   }
  }
 	echo json_encode($data);//返回二维数组形式的值供小程序端用 
}
function search($con) {
	$danhao=$_GET['danhao'];
	$sql="select * from send where 订单号 = '".$danhao."'";
	$res=$con->query($sql);
	if ($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}
	else{
	   echo '查询出错！';
    }
	echo json_encode($data);
}
function searchyonghu($con) {
	$yonghu=$_GET['yonghu'];
	$sql="select * from usr where uid = '".$yonghu."' or username = '".$yonghu."'";
	$res=$con->query($sql);
	if ($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}
	else{
	   echo '查询出错！';
    }
	echo json_encode($data);
}
function searchkuaidi($con) {
	$kuaiyuan=$_GET['kuai'];
	$sql="select * from usr where (uid = '".$kuaiyuan."' or username = '".$kuaiyuan."') and kuaidi = 1";
	$res=$con->query($sql);
	if ($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}
	else{
	   echo '查询出错！';
    }
	echo json_encode($data);
}
function jifenye($con)  {
	$uid=$_GET['uid'];
	$pageSize = 2;
	$page=$_GET['page'];
	$sql = "select * from send where 寄件人uid ='".$uid."'";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	$totalPage = ceil($num / $pageSize);
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq="select * from send where 寄件人uid ='".$uid."' limit ".$start.",".$pageSize;
	
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
function shoufenye($con) {
	$uid=$_GET['uid'];
	$pageSize = 2;
	$page=$_GET['page'];
	$sql = "select * from send where 收件人uid ='".$uid."'";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	if($num<=$pageSize){
		$totalPage=1;
	}else if($num>$pageSize){
		$totalPage = ceil($num / $pageSize);
	}
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq="select * from send where 收件人uid ='".$uid."' limit ".$start.",".$pageSize;
	
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
		
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
function jiedan($con){
	$pageSize = 2;
	$page=$_GET['page'];
	$sql = "select * from send where 物流状态 = 0";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	if($num<=$pageSize){
		$totalPage=1;
	}else if($num>$pageSize){
		$totalPage = ceil($num / $pageSize);
	}
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq = "select * from send where 物流状态 = 0 limit ".$start.",".$pageSize;
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
function send($con){
	$pageSize = 1;
	$page=$_GET['page'];
	$sql = "select * from send";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	if($num<=$pageSize){
		$totalPage=1;
	}else if($num>$pageSize){
		$totalPage = ceil($num / $pageSize);
	}
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq = "select * from send limit ".$start.",".$pageSize;
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
function yonghu($con){
	$pageSize = 1;
	$page=$_GET['page'];
	$sql = "select * from usr where kuaidi < 3";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	if($num<=$pageSize){
		$totalPage=1;
	}else if($num>$pageSize){
		$totalPage = ceil($num / $pageSize);
	}
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq = "select * from usr where kuaidi < 3 limit ".$start.",".$pageSize;
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
function kuaidi($con){
	$pageSize = 1;
	$page=$_GET['page'];
	$sql = "select * from usr where kuaidi = 1";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	if($num<=$pageSize){
		$totalPage=1;
	}else if($num>$pageSize){
		$totalPage = ceil($num / $pageSize);
	}
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq = "select * from usr where kuaidi = 1 limit ".$start.",".$pageSize;
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
function paisong($con)  {
	$pageSize = 3;
	$page=$_GET['page'];
	$uid=$_GET['uid'];
	$sql = "select * from send where 物流状态 != 0 and 物流状态<5 and 快递员uid = '".$uid."'";
	$query = $con->query($sql);
	$num = mysqli_num_rows($query);
	if($num<=$pageSize){
		$totalPage=1;
	}else if($num>$pageSize){
		$totalPage = ceil($num / $pageSize);
	}
	if($totalPage==0){
		$totalPage=1;
	}
	if($page==0){
		$page=1;
	}else if($page>=$totalPage){
		$page=$totalPage;
	}
	$start = ($page - 1) * $pageSize;
	$sq = "select * from send where 物流状态 != 0 and 物流状态<5 and 快递员uid = '".$uid."' limit ".$start.",".$pageSize;
	$res=$con->query($sq);
	if($res){
		$data=$res->fetch_all(PDO::FETCH_LAZY);
	}else{
		echo '查询出错！';
	}
	echo json_encode([$data,$totalPage]);
}
if ($con->connect_error) {
	die("连接失败：".$con->connect_error);
}
else 
{
	if($_GET['xinxi']=='zhuce'){zhuce($con);}
	else if($_GET['xinxi']=='denglu'){denglu($con);}
	else if($_GET['xinxi']=='chakuaidi'){search($con);}
	else if($_GET['xinxi']=='jifenye'){jifenye($con);}
	else if($_GET['xinxi']=='shoufenye'){shoufenye($con);}
	else if($_GET['xinxi']=='jiedan'){jiedan($con);}
	else if($_GET['xinxi']=='paisong'){paisong($con);}
	else if($_GET['xinxi']=='chayonghu'){searchyonghu($con);}
	else if($_GET['xinxi']=='yonghu'){yonghu($con);}
	else if($_GET['xinxi']=='di'){searchkuaidi($con);}
	else if($_GET['xinxi']=='kuaiyuan'){kuaidi($con);}
	else if($_GET['xinxi']=='send'){send($con);}
}
?>