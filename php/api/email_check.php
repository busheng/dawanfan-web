<?php
if(isset($_POST["email"]))
{
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        die();
    }
    $mysqli = new mysqli('127.0.0.1', 'root', 'LOUbu123', 'zhibo');
    if ($mysqli->connect_error){
        die('Could not connect to database!');
    }
    
    $email = filter_var($_POST["email"], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW|FILTER_FLAG_STRIP_HIGH);
    
    $statement = $mysqli->prepare("SELECT email FROM members WHERE email=?");
    $statement->bind_param('s', $email);
    $statement->execute();
    $statement->bind_result($email);
    if($statement->fetch()){
        echo "not_available";
        //die('<img src="img/not-available.png" />');
    }else{
        echo "available";
        //die('<img src="img/available.png" />');

    }
}
?>