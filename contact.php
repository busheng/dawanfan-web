<?php
ob_start();
session_start(); 
?>

<?php
$_SESSION['1_title'] = "大碗饭-反馈与联系";
$_SESSION['2_title'] = "反馈与联系";
$_SESSION['method'] = "contact";
?>

<?php 
      include('body.html');
?>

