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
	    echo "lgoin_success";
	} else {
		echo "login_fail";
	}
?>