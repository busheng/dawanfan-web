<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭-当前热门Dota2直播";
$_SESSION['2_title'] = "Dota2";
$_SESSION['cate'] = "dota2";
$_SESSION['method'] = "cate";
?>

<?php 
      include('body.html');
?>

