<?php
ob_start();
session_start(); 
?>
<?php
$_SESSION['1_title'] = "大碗饭-当前热门英雄联盟直播";
$_SESSION['2_title'] = "英雄联盟";
$_SESSION['cate'] = "lol";
$_SESSION['method'] = "cate";
?>
<?php 
      include('body.html');
?>

