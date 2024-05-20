<?php
//header("Content-type: text/html; charset=utf8");
//1. 声明字符编码
 
$host='localhost:3306';//数据库ip
 
$user='root';//用户名
 
$password='xyc287224546,a';//密码
 
$dbName='star';//要连接的数据库名
 
$con = mysqli_connect($host,$user,$password,$dbName);//数据库连接
 
 /*
if ($con->connect_error) {
  echo "系统异常，连接数据库失败";
}
else
{
	echo "连接成功";
}*/
?>