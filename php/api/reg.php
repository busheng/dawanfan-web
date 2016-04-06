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
			$subject = "注册确认－大碗饭TV";
			$subject = "=?UTF-8?B?".base64_encode($subject)."?=";
			$body = "<p>感谢您在大碗饭TV注册帐号！</p>
			<p>大碗饭TV目前仍然处于开发阶段，许多后续功能将在以后相继推出。大碗饭TV的宗旨就是帮助用户第一时间，最快速度找到自己喜爱的主播，完善用户的直播观赏体验！</p>
			<p>开发阶段会存在不足，也希望您能够谅解，如果有反馈和意见，请邮件coop@dawanfantv.com.</p>
			<p>最后祝您身体健康，工作学习顺利，看直播上大碗饭TV!</p><p><a href = 'http://www.dawanfantv.com'>大碗饭TV</a></p>";

			$mail = new Mail();
			$mail->setFrom(SITEEMAIL);
			$mail->addAddress($to);
			$mail->subject($subject);
			$mail->body($body);
			$mail->send();
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
