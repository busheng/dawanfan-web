<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭-当前热门War3直播";
$_SESSION['2_title'] = "魔兽争霸";
$_SESSION['cate'] = "war3";
$_SESSION['method'] = "cate";
?>

<?php 
      include('body.html');
?>

