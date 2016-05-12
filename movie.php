<?php
ob_start();
session_start(); 
?>
<?php
$_SESSION['1_title'] = "大碗饭-影视动漫";
$_SESSION['2_title'] = "影视动漫";
$_SESSION['cate'] = "movie";
$_SESSION['method'] = "cate";
?>
<?php 
      include('body.html');
?>

