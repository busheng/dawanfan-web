<?php
session_start(); 

//include config
require_once('config.php');
//check if already logged in move to home page
//process login form if submitted
//if(isset($_POST['submit'])){
	$username = $_GET['account'];
	$password = $_GET['password'];
	if($user->login($username,$password)){ 
		$_SESSION['username'] = $username;
		//$_SESSION['userid'] = $user->get_user_id($username);

		//header('Location: http://localhost/~busheng/dawanfancopy/');
		//exit;
	    echo "lgoin_success";
	} else {
		echo "login_fail";
		//$error[] = 'Wrong username or password or your account has not been activated.';
	}

//}//end if submit

?>