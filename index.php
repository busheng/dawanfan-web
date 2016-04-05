<?php
ob_start();
session_start(); 
?>


<?php
$_SESSION['1_title'] = "大碗饭TV-直播信息整合";
$_SESSION['2_title'] = "首页";
$_SESSION['cate'] = "";
$_SESSION['method'] = "index";
?>



<?php 
      include('body.html');
?>

