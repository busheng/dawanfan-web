<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭-当前热门";
$_SESSION['2_title'] = "当前热门";
$_SESSION['cate'] = "";
$_SESSION['method'] = "hot";
?>

<?php 
      include('body.html');
?>

