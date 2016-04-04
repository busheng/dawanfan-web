<?php

//set timezone
date_default_timezone_set('Europe/London');

//database credentials
define('DBHOST','127.0.0.1');
define('DBUSER','root');
define('DBPASS','LOUbu123');
define('DBNAME','zhibo');

//application address
define('DIR','http://dawanfantv.com/');
define('SITEEMAIL','noreply@dawanfantv.com');

try {

	//create PDO connection
	$db = new PDO("mysql:host=".DBHOST.";port=3306;dbname=".DBNAME, DBUSER, DBPASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->exec("SET CHARACTER SET utf8"); 

} catch(PDOException $e) {
	//show error
    echo '<p class="bg-danger">'.$e->getMessage().'</p>';
    exit;
}

//include the user class, pass in the database connection
include('classes/user.php');
include('classes/phpmailer/mail.php');
$user = new User($db);
?>
