<?php
ob_start();
session_start(); 
?>
<?php
$_SESSION['1_title'] = "大碗饭-户外直播";
$_SESSION['2_title'] = "户外直播";
$_SESSION['cate'] = "hwzb";
$_SESSION['method'] = "cate";
?>
<?php 
      include('body.html');
?>

