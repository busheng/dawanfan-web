<?php
ob_start();
session_start(); 
?>
<?php
$_SESSION['1_title'] = "大碗饭-星际争霸";
$_SESSION['2_title'] = "星际争霸";
$_SESSION['cate'] = "sc2";
$_SESSION['method'] = "cate";
?>
<?php 
      include('body.html');
?>

