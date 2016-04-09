<?php require('config.php');


	$hashedpassword = $user->password_hash($_GET['password'], PASSWORD_BCRYPT);
			try {

			$stmt = $db->prepare("UPDATE members SET password = :hashedpassword, resetComplete = 'Yes'  WHERE resetToken = :token");
			$stmt->execute(array(
				':hashedpassword' => $hashedpassword,
				':token' => ($_GET['keys'])
			));
			echo "reset_success";
		//else catch the exception and show the error.
		} catch(PDOException $e) {
		    $error[] = $e->getMessage();
		    echo $e->getMessage();
		}
?>
