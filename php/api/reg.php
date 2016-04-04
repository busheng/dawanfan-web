<?php require('config.php');
session_start(); 
	//very basic validation
	if(strlen($_GET['username']) < 3){
		$error = 'Username is too short.';
	} else {
		$stmt = $db->prepare('SELECT username FROM members WHERE username = :username');
		$stmt->execute(array(':username' => $_GET['username']));
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		if(!empty($row['username'])){
			$error = 'Username provided is already in use.';
		}

	}

	if(strlen($_GET['password']) < 6){
		$error = 'Password is too short.';
	}

	if(strlen($_GET['passwordConfirm']) < 6){
		$error = 'Confirm password is too short.';
	}

	if($_GET['password'] != $_GET['passwordConfirm']){
		$error = 'Passwords do not match.';
	}

	//email validation
	if(!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)){
	    $error = 'Please enter a valid email address';
	} else {
		$stmt = $db->prepare('SELECT email FROM members WHERE email = :email');
		$stmt->execute(array(':email' => $_GET['email']));
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		if(!empty($row['email'])){
			$error = 'Email provided is already in use.';
		}

	}

	//if no errors have been created carry on
	if(!isset($error)){

		//hash the password
		$hashedpassword = $user->password_hash($_GET['password'], PASSWORD_BCRYPT);

		//create the activasion code
		$activasion = md5(uniqid(rand(),true));

		try {

			//insert into database with a prepared statement
			$stmt = $db->prepare('INSERT INTO members (username,password,email,active) VALUES (:username, :password, :email, :active)');
			$stmt->execute(array(
				':username' => $_GET['username'],
				':password' => $hashedpassword,
				':email' => $_GET['email'],
				':active' => "Yes"
			));
			$id = $db->lastInsertId('memberID');

			//send email
			$to = $_GET['email'];
			$subject = "Registration Confirmation";
			$body = "<p>Thank you for registering at demo site.</p>
			<p>To activate your account, please click on this link: <a href='".DIR."activate.php?x=$id&y=$activasion'>".DIR."activate.php?x=$id&y=$activasion</a></p>
			<p>Regards Site Admin</p>";

			$mail = new Mail();
			$mail->setFrom(SITEEMAIL);
			$mail->addAddress($to);
			$mail->subject($subject);
			$mail->body($body);
			//$mail->send();
			$username = $_GET['username'];
			$password = $_GET['password'];
			$user->login($username,$password);
			echo "reg_success";
			//redirect to index page

		//else catch the exception and show the error.
		} catch(PDOException $e) {
		    $error[] = $e->getMessage();
		    echo "请刷新页面，重新注册～";
		}

	} else {

		//echo "请刷新页面，重新注册～";
		$error = $error.' 请刷新页面，重新注册～';
		echo $error;
	}



//define page title
$title = 'Demo';
?>
