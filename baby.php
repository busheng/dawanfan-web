<?php
ob_start();
session_start(); 
?>


<?php
$_SESSION['1_title'] = "大碗饭-当前热门美女直播";
$_SESSION['2_title'] = "萌妹御姐";
$_SESSION['cate'] = "baby";
$_SESSION['method'] = "cate";
?>



<?php 
      include('body.html');
?>

