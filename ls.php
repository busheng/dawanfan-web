<?php
ob_start();
session_start(); 
?>


<?php
$_SESSION['1_title'] = "大碗饭-当前热门炉石传说直播";
$_SESSION['2_title'] = "炉石传说";
$_SESSION['cate'] = "ls";
$_SESSION['method'] = "cate";
?>



<?php 
      include('body.html');
?>

