<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭- 魔兽世界";
$_SESSION['2_title'] = "魔兽世界";
$_SESSION['cate'] = "wow";
$_SESSION['method'] = "cate";
?>

<?php 
      include('body.html');
?>

