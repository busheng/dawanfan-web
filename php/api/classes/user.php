<?php
include('password.php');
class User extends Password{

    private $_db;

    function __construct($db){
    	parent::__construct();

    	$this->_db = $db;
    }

	private function get_user_hash($username){

		try {
			$stmt = $this->_db->prepare('SELECT password, username, memberID FROM members WHERE username = :username AND active="Yes" ');
			$stmt->execute(array('username' => $username));

			return $stmt->fetch();

		} catch(PDOException $e) {
		    echo '<p class="bg-danger">'.$e->getMessage().'</p>';
		}
	}

	public function is_user_subscribe($cate, $zhubo, $userid) {
		try {
			$stmt = $this->_db->prepare('SELECT loveID FROM loves WHERE userID = :userid AND zhubo = :zhubo AND cate = :cate ');
			$stmt->execute(array('userid' => $userid,'zhubo' => $zhubo,'cate' => $cate));
			$row = $stmt->fetch();
			if ($row > 0) return true;
			else return false;
		} catch(PDOException $e) {
		    echo '<p class="bg-danger">'.$e->getMessage().'</p>';
		}

	}

	public function user_subscribe($cate, $zhubo, $userid) {
		if (!$this->is_logged_in()) return false; 
		if ($this->is_user_subscribe($cate, $zhubo, $userid)) return true;
		try {

			$stmt = $this->_db->prepare('INSERT INTO loves(userID, zhubo, cate) VALUES (:userid, :zhubo, :cate)');
			$stmt->execute(array('userid' => $userid,'zhubo' => $zhubo,'cate' => $cate));
		} catch(PDOException $e) {
		    echo '<p class="bg-danger">'.$e->getMessage().'</p>';
		}

	}

	public function user_unsubscribe($cate, $zhubo, $userid) {
		if (!$this->is_logged_in()) return false; 
		if (!$this->is_user_subscribe($cate, $zhubo, $userid)) return true;
		try {

			$stmt = $this->_db->prepare('DELETE FROM loves WHERE userID = :userid AND zhubo = :zhubo AND cate = :cate ');
			$stmt->execute(array('userid' => $userid,'zhubo' => $zhubo,'cate' => $cate));
		} catch(PDOException $e) {
		    echo '<p class="bg-danger">'.$e->getMessage().'</p>';
		}

	}


	public function login($username,$password){

		$row = $this->get_user_hash($username);

		if($this->password_verify($password,$row['password']) == 1){
		    $_SESSION['loggedin'] = true;
		    $_SESSION['username'] = $row['username'];
		    $_SESSION['memberID'] = $row['memberID'];
  			setcookie("cookie_username", $_SESSION['username'], time() + (86400 * 30), "/");
  			setcookie("cookie_id", $_SESSION['memberID'], time() + (86400 * 30), "/"); 	 
  			setcookie("cookie_login", $_SESSION['loggedin'], time() + (86400 * 30), "/"); 	 

		    return true;
		}
	}

	public function logout(){
		setcookie("cookie_username", "", -1, "/"); 
		setcookie("cookie_id", "", -1, "/"); 
		setcookie("cookie_login", "", -1,"/"); 
		session_destroy();
	}

	public function is_logged_in(){
		if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
			return true;
		}
	}



}


?>
