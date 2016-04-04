<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭-当前热门PC游戏";
$_SESSION['2_title'] = "PC及其他热门游戏";
$_SESSION['cate'] = "other";
$_SESSION['method'] = "cate";
?>

<?php 
      include('body.html');
?>

