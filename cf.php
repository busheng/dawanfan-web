<?php
ob_start();
session_start(); 
?>
<?php
$_SESSION['1_title'] = "大碗饭-穿越火线";
$_SESSION['2_title'] = "穿越火线－CF";
$_SESSION['cate'] = "cf";
$_SESSION['method'] = "cate";
?>
<?php 
      include('body.html');
?>

