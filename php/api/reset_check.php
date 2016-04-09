<?php require('config.php');

	//email validation
	if(!filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)){
	    echo 'Please enter a valid email address';
	    $error = 1;
	} else {
		$stmt = $db->prepare('SELECT email FROM members WHERE email = :email');
		$stmt->execute(array(':email' => $_GET['email']));
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		if(empty($row['email'])){
			echo 'Email provided is not on recognised.';
			$error = 1;
		}

	}

	//if no errors have been created carry on
	if(!isset($error)){

		//create the activasion code
		$token = md5(uniqid(rand(),true));

		try {

			$stmt = $db->prepare("UPDATE members SET resetToken = :token, resetComplete='No' WHERE email = :email");
			$stmt->execute(array(
				':email' => $row['email'],
				':token' => $token
			));

			//send email
			$to = $row['email'];
			$subject = "大碗饭TV - 重置密码";
			$subject = "=?UTF-8?B?".base64_encode($subject)."?=";
			$body = "<p>请点击下面的链接重置密码</p>
			<p>如果你不知道这封邮件或没有申请重置密码，请不要点击，请联系coop@dawanfantv.com.</p>
			<p>点击链接重置密码: <a href='".DIR."resetPassword?key=$token'>".DIR."resetPassword?key=$token</a></p>
			<p><a href = 'http://www.dawanfantv.com'>大碗饭TV</a></p>";

			$mail = new Mail();
			$mail->setFrom(SITEEMAIL);
			$mail->addAddress($to);
			$mail->subject($subject);
			$mail->body($body);
			$mail->send();

			echo "reset_send";
		//else catch the exception and show the error.
		} catch(PDOException $e) {
		    $error[] = $e->getMessage();
		}

	}

