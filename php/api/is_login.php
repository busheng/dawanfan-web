<?php
session_start(); 

require_once('config.php');
if (!$user->is_logged_in()) {
	echo "unlogin";
} else {
	echo "login";
}
//}//end if submit
?>