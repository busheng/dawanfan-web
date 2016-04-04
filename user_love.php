<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭-你喜爱的主播";
$_SESSION['2_title'] = "关注的主播";
$_SESSION['cate'] = "";
$_SESSION['method'] = "user_love";
?>

<?php 
      include('body.html');
?>

