<?php
ob_start();
session_start(); 
?>
<?php
$_SESSION['1_title'] = "大碗饭- 地下城与勇士";
$_SESSION['2_title'] = "地下城与勇士－DNF";
$_SESSION['cate'] = "dnf";
$_SESSION['method'] = "cate";
?>
<?php 
      include('body.html');
?>

