<?php
session_start(); 

require_once('config.php');
//check if already logged in move to home page
//process login form if submitted
//if(isset($_POST['submit'])){
	$cate = $_GET['cate'];
	$zhubo = $_GET['zhubo'];
	if (!$user->is_logged_in()) {
		echo "please log in";
	} else {
		$userid = $_SESSION['memberID'];
		$user->user_unsubscribe($cate, $zhubo, $userid);
		//echo $userid;
	}
//}//end if submit

?>